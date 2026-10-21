// Menú contextual: seleccionar texto en una página -> clic derecho -> "Mayúsculas y copiar"
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "mayusculas",
    title: "Mayúsculas y copiar \"%s\"",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "mayusculas" || !tab?.id) return;

  // Mayúsculas sin tildes, conservando la Ñ (igual que en popup.js)
  const resultado = info.selectionText.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, (m, i, s) =>
    m === "̃" && s[i - 1] === "N" ? m : ""
  ).normalize("NFC");

  // El service worker no tiene acceso al portapapeles; se copia desde la página
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (texto) => navigator.clipboard.writeText(texto),
    args: [resultado]
  });
});
