// Menú contextual: seleccionar texto en una página -> clic derecho -> "Compactar y copiar"
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "compactar",
    title: "Compactar y copiar \"%s\"",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "compactar" || !tab?.id) return;

  const resultado = info.selectionText.replace(/[\s\-‐‑–—]+/g, "");

  // El service worker no tiene acceso al portapapeles; se copia desde la página
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (texto) => navigator.clipboard.writeText(texto),
    args: [resultado]
  });
});
