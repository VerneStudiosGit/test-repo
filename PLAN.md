# Plan: Add 3D Rotating Wireframe Cube to Landing Page

## Summary

Add a rotating 3D wireframe cube to the landing page background using Three.js (loaded via CDN). The cube will be rendered on a full-screen canvas positioned behind the existing text content, creating a cool technological aesthetic. The cube will rotate continuously on both the X and Y axes, displayed as a wireframe with a subtle color that complements the existing design.

## Files to Create

| File | Purpose |
|------|---------|
| `js/cube.js` | Three.js scene setup: camera, wireframe cube mesh, animation loop, and window resize handling |

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | 1. Add Three.js CDN `<script>` tag in `<head>` <br> 2. Add `<canvas>` element for the 3D scene as first child of `<body>` <br> 3. Add inline `<style>` to position the canvas as a fixed background layer <br> 4. Add `<script src="js/cube.js">` before closing `</body>` <br> 5. Set `<nav>` and `<main>` to `relative z-10` so content stays above the canvas |

## Implementation Steps

1. **Create `js/` directory and `js/cube.js` file**
   - Initialize a Three.js `Scene`, `PerspectiveCamera`, and `WebGLRenderer`
   - Attach the renderer to a canvas element with id `bg-cube`
   - Set renderer background to transparent (`alpha: true`) so the white page shows through
   - Create a `BoxGeometry` and `MeshBasicMaterial` with `wireframe: true`
   - Use a subtle color (e.g., `#3b82f6` — Tailwind blue-500) with some transparency
   - Add the wireframe cube `Mesh` to the scene
   - Position the camera so the cube appears large and centered
   - Implement an `animate()` loop using `requestAnimationFrame` that rotates the cube on X and Y axes
   - Add a `resize` event listener to keep the renderer and camera aspect ratio in sync with the viewport

2. **Modify `index.html`**
   - Add `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>` in `<head>`
   - Add a `<style>` block to position the canvas:
     ```css
     #bg-cube {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       z-index: 0;
       pointer-events: none;
     }
     ```
   - Add `<canvas id="bg-cube"></canvas>` as first child of `<body>`
   - Add `relative z-10` Tailwind classes to `<nav>` and `<main>` so they render above the canvas
   - Add `<script src="js/cube.js"></script>` before `</body>`

## Testing

1. **Visual check**: Open `index.html` in a browser and confirm:
   - A wireframe cube is visible in the center of the page, rotating smoothly
   - The cube appears behind the navbar and the "Hola a todos" text
   - Text and links remain fully readable and clickable above the cube
2. **Resize check**: Resize the browser window — the cube and canvas should adapt without distortion
3. **Navigation check**: Click "About Us" and "Home" links — they should still work normally
4. **Performance check**: Confirm smooth 60fps animation with no jank (check browser DevTools Performance tab)
5. **Mobile check**: Open on a mobile viewport — cube should still render centered and text should remain legible
