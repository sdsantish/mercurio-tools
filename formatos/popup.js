const filtro = document.getElementById("filtro");
const lista = document.getElementById("lista");
const formulario = document.getElementById("formulario");
const camposDiv = document.getElementById("campos");
const salida = document.getElementById("salida");

let visibles = [];
let activo = 0;
let plantilla = null;

// Sin tildes y en minúsculas, para buscar "conciliacion" o "conciliación" igual
const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const titulo = (p) => [p.trd, p.nombre || p.campos[1].etiqueta].filter(Boolean).join(" · ");

// ---------- Borrador ----------
// Se guarda en cada cambio para no perder los datos si el popup se cierra
// al hacer clic fuera. Solo se borra al copiar.

const CLAVE_BORRADOR = "borrador";

// Identifica la plantilla por su contenido, no por su posición en la lista
const clavePlantilla = (p) => [p.codigo, p.trd, ...p.campos.map((c) => c.etiqueta)].join("|");

function guardarBorrador() {
  const valores = [...camposDiv.querySelectorAll("input")].map((i) => i.value);
  try {
    localStorage.setItem(CLAVE_BORRADOR, JSON.stringify({ plantilla: clavePlantilla(plantilla), valores }));
  } catch {}
}

function cargarBorrador() {
  try {
    const b = JSON.parse(localStorage.getItem(CLAVE_BORRADOR));
    const p = b && PLANTILLAS.find((x) => clavePlantilla(x) === b.plantilla);
    return p ? { p, valores: b.valores } : null;
  } catch {
    return null;
  }
}

function borrarBorrador() {
  try {
    localStorage.removeItem(CLAVE_BORRADOR);
  } catch {}
}

// ---------- Lista filtrable ----------

function filtrar() {
  const q = normalizar(filtro.value.trim());
  visibles = PLANTILLAS.filter((p) =>
    !q || p.codigo.startsWith(q) || p.trd?.startsWith(q) || normalizar(`${p.categoria} ${titulo(p)}`).includes(q)
  );
  activo = 0;
  pintarLista();
}

function pintarLista() {
  lista.classList.remove("oculto");
  lista.innerHTML = "";

  if (!visibles.length) {
    lista.innerHTML = '<li class="vacio">Sin resultados</li>';
    return;
  }

  visibles.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = i === activo ? "activo" : "";
    li.innerHTML = `<span class="codigo"></span><span class="cat"></span><span class="doc"></span>`;
    li.querySelector(".codigo").textContent = p.codigo;
    li.querySelector(".cat").textContent = p.categoria;
    li.querySelector(".doc").textContent = titulo(p);
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      elegir(p);
    });
    lista.appendChild(li);
  });

  lista.children[activo]?.scrollIntoView({ block: "nearest" });
}

filtro.addEventListener("input", filtrar);
filtro.addEventListener("focus", () => {
  filtro.select();
  filtrar();
});
filtro.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    if (!visibles.length) return;
    activo = (activo + (e.key === "ArrowDown" ? 1 : -1) + visibles.length) % visibles.length;
    pintarLista();
  } else if (e.key === "Enter" && visibles[activo]) {
    e.preventDefault();
    elegir(visibles[activo]);
  }
});

// ---------- Formulario ----------

// Al cambiar de categoría se conservan los campos con la misma etiqueta (C.E., DTE:, ...)
function valoresActuales(p) {
  if (!plantilla) return [];
  const inputs = [...camposDiv.querySelectorAll("input")];
  const porEtiqueta = {};
  plantilla.campos.forEach((c, i) => {
    if (c.etiqueta) porEtiqueta[c.etiqueta] = inputs[i].value;
  });
  return p.campos.map((c) => porEtiqueta[c.etiqueta] || "");
}

function elegir(p, valores = valoresActuales(p)) {
  plantilla = p;
  filtro.value = `${p.codigo} - ${p.categoria} - ${titulo(p)}`;
  lista.classList.add("oculto");
  formulario.classList.remove("oculto");

  camposDiv.innerHTML = "";
  p.campos.forEach((c, i) => {
    const fila = document.createElement("div");
    fila.className = "campo";
    const span = document.createElement("span");
    span.textContent = c.etiqueta || " ";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = c.placeholder || "";
    input.value = valores[i] || "";
    input.addEventListener("input", () => {
      generar();
      guardarBorrador();
    });
    fila.append(span, input);
    camposDiv.appendChild(fila);
  });

  const inputs = [...camposDiv.querySelectorAll("input")];
  inputs.forEach((input, i) => {
    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.ctrlKey) return;
      e.preventDefault();
      if (i < inputs.length - 1) inputs[i + 1].focus();
      else copiar();
    });
  });

  generar();
  guardarBorrador();
  (inputs.find((i) => !i.value) || inputs[0]).focus();
}

function generar() {
  const valores = [...camposDiv.querySelectorAll("input")].map((i) => i.value.trim());
  salida.value = plantilla.campos
    .map((c, i) => ({ c, v: valores[i] }))
    .filter(({ c, v }) => !c.opcional || v)
    .map(({ c, v }) => [c.etiqueta, v].filter(Boolean).join(" "))
    .join("\n");
}

// Copia el resultado al portapapeles y cierra la ventana
async function copiar() {
  if (!plantilla) return;
  await navigator.clipboard.writeText(salida.value);
  borrarBorrador();
  window.close();
}

document.getElementById("copy").addEventListener("click", copiar);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) copiar();
});

// Al abrir: si hay un borrador pendiente se restaura, si no, se empieza por el buscador
const borrador = cargarBorrador();
if (borrador) {
  elegir(borrador.p, borrador.valores);
} else {
  filtrar();
  filtro.focus();
}
