# Radicación masiva

Extensión de Chrome que abre varias pestañas del formulario de radicación y las deja **prellenadas** según la categoría (401, 402, 109, ...). **No envía nada**: cada pestaña queda lista para que la radicadora la revise, complete y envíe.

## Qué hace, paso a paso

1. Abres la extensión y eliges:
   - **Categoría** (lista con filtro, igual que la herramienta de Alt+S: escribes `40` y salen 401, 402, 406, 408).
   - **Cantidad de pestañas** (por ejemplo, 20).
2. Pulsas **Abrir y rellenar**.
3. La extensión abre esa cantidad de pestañas con el formulario vacío.
4. En cada pestaña espera a que el formulario cargue y rellena los campos fijos de esa categoría.
5. Se detiene ahí. **No pulsa enviar ni guarda nada.**

## Qué rellena

### Descripción

En la descripción se pone el formato de la categoría con **los campos vacíos**. La radicadora los completa cuando encuentra los datos y borra las líneas que no necesita.

En las categorías con dos documentos posibles se ponen **los dos títulos** y la radicadora borra el que no corresponda.

| Código | Categoría | Formato en la descripción |
|---|---|---|
| 109 | Radicados incompletos | `C.E.`<br>`AUTO ADMITE DEMANDA DE (MEDIO DE CONTROL)`<br>`DEMANDA DE (MEDIO DE CONTROL)`<br>`DTE:`<br>`DDO:` |
| 250 | Radicados por archivar | `C.E.`<br>`DOCUMENTO AL QUE CORRESPONDA EJEMPLO PODER O DEMANDA INCOMPLETA`<br>`DTE:`<br>`DDO:` |
| 401 | Procesos nacionales | `C.E.`<br>`PROCESO`<br>`AUTO LIBRA MANDAMIENTO DE PAGO`<br>`DTE:`<br>`DDO:` |
| 411 | Procesos territoriales | igual que 401 |
| 402 | Conciliaciones nacionales | `C.E.`<br>`SOLICITUD DE CONCILIACION (A)`<br>`CTE:`<br>`CDO:` |
| 412 | Conciliaciones territoriales | igual que 402 |
| 408 | Conciliaciones admitidas nacionales | `C.E.`<br>`SOLICITUD DE CONCILIACION ADMITIDA`<br>`CTE:`<br>`CDO:` |
| 418 | Conciliaciones admitidas territoriales | igual que 408 |
| 406 | Sentencias - Kogui | `C.E.`<br>`SENTENCIA`<br>`AUTO QUE TERMINA PROCESO`<br>`DTE:`<br>`DDO:` |
| 416 | Sentencia | igual que 406 |

### Otros campos

_Pendiente de definir_ (por ejemplo "Dirigido a" y TRD). Ver la sección siguiente.

## Qué falta para construirla

- [ ] **Dirección (URL) del formulario.** Ya sabemos que al abrirla sale el formulario vacío.
- [ ] **Código de la página.** Con el formulario abierto, pulsar **Ctrl+S**, elegir "Página web completa" y guardarla en esta carpeta (`radicacion-masiva`).
- [ ] **Captura del formulario vacío.** Guardarla también en esta carpeta.
- [ ] **Qué otros campos se rellenan y con qué valor** en cada categoría, además de la descripción, y cuáles se dejan vacíos.

## Qué no hace

- No envía ni guarda el radicado.
- No rellena C.E., DTE, DDO, CTE ni CDO: esos datos los pone la radicadora.
- No inicia sesión: hay que tener la sesión abierta en Chrome antes de usarla.

## Herramientas relacionadas

| Carpeta | Atajo | Qué hace |
|---|---|---|
| `compactar-texto` | Alt+Q | Quita espacios, guiones y puntos (`eee-222.eee` → `eee222eee`) |
| `mayusculas` | Alt+W | Pasa el texto a mayúsculas y quita las tildes (conserva la Ñ) |
| `formatos` | Alt+S | Rellena un formato con datos y copia el texto |
| `radicacion-masiva` | — | Abre N pestañas del formulario prellenadas (esta) |
