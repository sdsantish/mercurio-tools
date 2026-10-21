const mayusculas = (texto) => texto.toUpperCase();

const input = document.getElementById("input");
const output = document.getElementById("output");

function actualizar() {
  output.value = mayusculas(input.value);
}

// Copia el resultado al portapapeles y cierra la ventana
async function copiar() {
  if (!output.value) return;
  await navigator.clipboard.writeText(output.value);
  window.close();
}

// Al pegar: convierte, copia y cierra automáticamente
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
