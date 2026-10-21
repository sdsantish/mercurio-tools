// Quita espacios (incluye tabs/saltos de línea) y guiones (-, ‐, –, —)
const compactar = (texto) => texto.replace(/[\s\-‐‑–—]+/g, "");

const input = document.getElementById("input");
const output = document.getElementById("output");
const status = document.getElementById("status");

function actualizar() {
  output.value = compactar(input.value);
  status.textContent = "";
}

// Copia el resultado al portapapeles y cierra la ventana
async function copiar() {
  if (!output.value) return;
  await navigator.clipboard.writeText(output.value);
  window.close();
}

// Al pegar: compacta, copia y cierra automáticamente
input.addEventListener("paste", (e) => {
  e.preventDefault();
  input.value = e.clipboardData.getData("text");
  actualizar();
  copiar();
});
input.addEventListener("input", actualizar);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") copiar();
});
document.getElementById("copy").addEventListener("click", copiar);
