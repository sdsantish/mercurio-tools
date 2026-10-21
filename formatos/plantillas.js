// Cada plantilla genera una línea por campo: "<etiqueta> <valor>".
// Los campos con opcional: true solo salen si tienen valor.
const PROCESO = (titulo, placeholder = "") => [
  { etiqueta: "C.E." },
  { etiqueta: titulo, placeholder },
  { etiqueta: "DTE:" },
  { etiqueta: "DDO:" }
];

const CONCILIACION = (titulo, extra = []) => [
  { etiqueta: "C.E." },
  { etiqueta: titulo },
  { etiqueta: "CTE:" },
  { etiqueta: "CDO:" },
  ...extra
];

// nombre: texto a mostrar en la lista cuando la etiqueta del título no basta.
// trd: código TRD, se muestra en la lista y también sirve para buscar.
const PLANTILLAS = [
  { codigo: "109", trd: "109.01", categoria: "Radicados incompletos",
    campos: PROCESO("AUTO ADMITE DEMANDA DE", "Medio de control") },
  { codigo: "109", trd: "109.02", categoria: "Radicados incompletos",
    campos: PROCESO("DEMANDA DE", "Medio de control") },
  { codigo: "250", categoria: "Radicados por archivar", nombre: "DOCUMENTO (PODER, DEMANDA INCOMPLETA...)",
    campos: PROCESO("", "Documento (ej. PODER, DEMANDA INCOMPLETA)") },

  { codigo: "401", categoria: "Procesos nacionales", campos: PROCESO("PROCESO") },
  { codigo: "401", categoria: "Procesos nacionales", campos: PROCESO("AUTO LIBRA MANDAMIENTO DE PAGO") },
  { codigo: "411", categoria: "Procesos territoriales", campos: PROCESO("PROCESO") },
  { codigo: "411", categoria: "Procesos territoriales", campos: PROCESO("AUTO LIBRA MANDAMIENTO DE PAGO") },

  { codigo: "402", categoria: "Conciliaciones nacionales", campos: CONCILIACION("SOLICITUD DE CONCILIACION (A)") },
  { codigo: "412", categoria: "Conciliaciones territoriales", campos: CONCILIACION("SOLICITUD DE CONCILIACION (A)") },

  { codigo: "408", categoria: "Conciliaciones admitidas nacionales",
    campos: CONCILIACION("SOLICITUD DE CONCILIACION ADMITIDA", [{ etiqueta: "", placeholder: "Radicado (E-2026-...)", opcional: true }]) },
  { codigo: "418", categoria: "Conciliaciones admitidas territoriales",
    campos: CONCILIACION("SOLICITUD DE CONCILIACION ADMITIDA", [{ etiqueta: "", placeholder: "Radicado (E-2026-...)", opcional: true }]) },

  { codigo: "406", categoria: "Sentencias - Kogui", campos: PROCESO("SENTENCIA") },
  { codigo: "406", categoria: "Sentencias - Kogui", campos: PROCESO("AUTO QUE TERMINA PROCESO") },
  { codigo: "416", categoria: "Sentencia", campos: PROCESO("SENTENCIA") },
  { codigo: "416", categoria: "Sentencia", campos: PROCESO("AUTO QUE TERMINA PROCESO") }
];
