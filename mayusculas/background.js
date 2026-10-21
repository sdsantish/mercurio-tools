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

  const resultado = info.selectionText.toUpperCase();

  // El service worker no tiene acceso al portapapeles; se copia desde la página
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (texto) => navigator.clipboard.writeText(texto),
    args: [resultado]
  });
});
