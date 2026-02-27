# Plan: Animación de avión volando

## Summary

Se implementará una animación de un avión (usando el emoji ✈️) que se desplaza continuamente de izquierda a derecha a través de la pantalla, simulando que está volando. Cuando el avión sale completamente por el borde derecho, reaparece por el borde izquierdo creando un efecto de loop infinito. La implementación seguirá los patrones existentes del proyecto: CSS `@keyframes` para la animación y un archivo JavaScript separado en `js/` con el patrón IIFE para controlar el comportamiento.

## Files to Create

| File | Purpose |
|------|---------|
| `js/plane.js` | Script que inicializa el elemento del avión y agrega variación aleatoria en la altura de vuelo entre cada ciclo usando el evento `animationiteration`. Usa el patrón IIFE consistente con `cube.js` y `welcome-modal.js`. |

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | 1. Agregar estilos CSS para el avión (`#flying-plane`) con `position: fixed`, `z-index: 10`, `pointer-events: none` y la animación `@keyframes flyAcross` que mueve el avión de fuera de la pantalla por la izquierda hasta fuera por la derecha. 2. Agregar el elemento HTML `<div id="flying-plane">✈️</div>` en el body. 3. Agregar `<script src="js/plane.js"></script>` al final del body junto a los otros scripts. |

## Implementation Steps

### 1. Agregar CSS en `index.html`

Dentro del bloque `<style>` existente, agregar los estilos para `#flying-plane`:
- `position: fixed` para que flote sobre el contenido
- `top: 15%` para posicionarlo en la parte superior de la pantalla
- `left: 0` como punto de referencia
- `z-index: 10` para que esté por encima del contenido pero debajo del modal (z-index 50)
- `font-size: 3rem` para un tamaño visible del emoji
- `pointer-events: none` para no interferir con clics
- `animation: flyAcross 8s linear infinite` para el movimiento continuo

### 2. Agregar `@keyframes flyAcross`

Definir la animación CSS:
- `from { transform: translateX(-100px); }` — empieza fuera de la pantalla por la izquierda
- `to { transform: translateX(calc(100vw + 100px)); }` — termina fuera de la pantalla por la derecha
- `linear` timing para velocidad constante de vuelo
- `infinite` para loop automático (al terminar, CSS reinicia desde `from`)

### 3. Agregar elemento HTML en `index.html`

Insertar `<div id="flying-plane">✈️</div>` después del `<canvas id="bg-cube">` y antes del `<nav>`, manteniendo el orden lógico de capas visuales.

### 4. Crear `js/plane.js`

Script con patrón IIFE que:
- Selecciona el elemento `#flying-plane`
- Escucha el evento `animationiteration` para detectar cuándo completa un ciclo
- En cada iteración, cambia aleatoriamente la posición vertical (`top`) entre 10% y 80% para que el avión no siempre vuele a la misma altura exacta

### 5. Incluir el script en `index.html`

Agregar `<script src="js/plane.js"></script>` después de los scripts existentes al final del `<body>`.

## Testing

1. **Verificación visual**: Abrir `index.html` en el navegador y confirmar que el emoji ✈️ aparece y se desplaza suavemente de izquierda a derecha.
2. **Loop infinito**: Esperar a que el avión salga por la derecha y verificar que reaparece por la izquierda sin saltos ni pausas visibles.
3. **Variación de altura**: Después de varios ciclos, confirmar que el avión vuela a alturas distintas cada vez.
4. **No interferencia**: Confirmar que el avión no bloquea clics en la navegación, el heading interactivo ni el botón del modal.
5. **Responsive**: Verificar que la animación funciona correctamente en diferentes tamaños de ventana.
6. **Coexistencia**: Confirmar que el cubo 3D, la animación de caracteres del heading y el modal de bienvenida siguen funcionando correctamente.
