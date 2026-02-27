# Plan: Modal de Bienvenida

## Summary

Se creará un modal de bienvenida que aparezca al cargar la página principal (`index.html`), explicando al usuario en español que este repositorio es una zona de juegos para hacer pruebas con un sistema de agentes que usan metodología agile y scrum. El modal seguirá los patrones existentes del proyecto: HTML semántico, Tailwind CSS vía CDN para estilos, y JavaScript vanilla sin dependencias adicionales. Incluirá un botón para cerrar el modal y una animación sutil de entrada.

## Files to Create

| Archivo | Propósito |
|---------|-----------|
| `js/welcome-modal.js` | Script vanilla JS que gestiona la visualización y cierre del modal de bienvenida. |

## Files to Modify

| Archivo | Cambios |
|---------|---------|
| `index.html` | 1. Agregar el markup HTML del modal de bienvenida dentro del `<body>`. 2. Agregar estilos CSS para la animación del modal en el bloque `<style>` existente. 3. Incluir el script `js/welcome-modal.js` antes del cierre de `</body>`. |

## Implementation Steps

### 1. Agregar estilos CSS del modal en `index.html`

Añadir al bloque `<style>` existente las siguientes reglas:
- **Overlay** (`#welcome-modal`): fondo semi-transparente oscuro (`rgba(0,0,0,0.5)`), posición fixed, `inset: 0`, display flex centrado, `z-index: 50` para estar por encima de todo.
- **Contenedor del modal** (`.modal-content`): fondo blanco, bordes redondeados (`rounded-2xl`), sombra, padding, max-width responsivo (~`28rem`), animación de entrada.
- **Animación de entrada**: `@keyframes modalFadeIn` con transición de opacidad (0→1) y escala (0.95→1).
- **Clase `.hidden`**: `display: none` para ocultar el modal al cerrarlo.

### 2. Agregar el HTML del modal en `index.html`

Insertar justo después de la apertura de `<body>` (antes de `<canvas>`):
- Un `<div id="welcome-modal">` overlay que cubra toda la pantalla.
- Dentro, un `<div class="modal-content">` contenedor con:
  - Encabezado: texto "¡Bienvenido/a!" en un `<h2>` grande y bold.
  - Párrafo principal explicando que este repositorio es una **zona de juegos** (playground) para hacer pruebas con un **sistema de agentes** que utilizan metodología **agile y scrum**.
  - Un segundo párrafo corto invitando a explorar libremente.
  - Botón `<button id="close-modal">` con texto "¡Entendido!" estilizado con Tailwind (fondo azul, texto blanco, hover).

### 3. Crear `js/welcome-modal.js`

Script vanilla JS (IIFE) que:
- Selecciona el overlay por `id="welcome-modal"`.
- Selecciona el botón por `id="close-modal"`.
- Al hacer click en el botón, oculta el modal añadiendo la clase `hidden`.
- Al hacer click en el overlay (fuera del contenedor del modal), también cierra el modal. Usa `event.target === overlay` para evitar cerrar al hacer click dentro del contenido.

### 4. Incluir el script en `index.html`

Agregar `<script src="js/welcome-modal.js"></script>` después de la línea de `cube.js`.

## Testing

1. **Abrir `index.html` en el navegador**: El modal debe aparecer centrado con fondo oscuro semi-transparente.
2. **Verificar contenido**: El texto debe estar en español y explicar el propósito del repositorio (zona de juegos, agentes, agile/scrum).
3. **Cerrar con botón**: Al hacer click en "¡Entendido!" el modal debe desaparecer.
4. **Cerrar con overlay**: Al hacer click fuera del modal (en el fondo oscuro) el modal debe cerrarse.
5. **Responsividad**: El modal debe verse correctamente en mobile (ancho reducido) y desktop.
6. **Z-index**: El modal debe estar por encima del navbar, el canvas 3D y todos los demás elementos.
7. **Recargar página**: El modal debe volver a aparecer (comportamiento deseado para un playground).
8. **About page**: Verificar que `about.html` no se vea afectada.
