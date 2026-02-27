# Plan: 3D Rotating Wireframe Cube on Landing Page

## Summary

Add a rotating 3D wireframe cube to the landing page (`index.html`) using Three.js loaded via CDN. The cube will be rendered on a full-screen canvas positioned behind the existing text content, creating a cool technological background effect. Since this is a static HTML project with no build tools (Tailwind CSS via CDN), Three.js will also be loaded via CDN, keeping the approach consistent with the existing architecture.

## Files to Create

| File | Purpose |
|------|---------|
| `js/cube.js` | Three.js scene setup: creates a wireframe cube, camera, renderer, and animation loop. Handles window resizing. |

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | 1. Add Three.js CDN `<script>` tag in `<head>`. 2. Add a `<canvas>` element for the 3D scene. 3. Add inline `<style>` to position the canvas as a fixed fullscreen background (behind all content via `z-index`). 4. Add `<script>` tag to load `js/cube.js` before `</body>`. 5. Add `relative z-10` Tailwind classes to nav and main so they stay above the canvas. |

## Implementation Steps

### Step 1: Create `js/cube.js`

Create a new `js/` directory and `js/cube.js` file with the following logic:

- Use the global `THREE` object (loaded via CDN).
- Create a `Scene`, `PerspectiveCamera`, and `WebGLRenderer` targeting a canvas element with id `bg-cube`.
- Set renderer to fill the viewport with a transparent background (`alpha: true`).
- Create a `BoxGeometry` (cube) and apply a `MeshBasicMaterial` with `wireframe: true` and color `#3b82f6` (Tailwind blue-500, matching the site's accent).
- Add the wireframe cube `Mesh` to the scene.
- Position the camera at `z = 3` so the cube is nicely visible and centered.
- Create an `animate()` loop using `requestAnimationFrame` that rotates the cube slowly on both X and Y axes each frame.
- Add a `window.resize` event listener to keep camera aspect ratio and renderer size in sync with viewport.

### Step 2: Modify `index.html`

- Add Three.js CDN script in `<head>` (after Tailwind):
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  ```

- Add inline `<style>` block in `<head>`:
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

- Add `<canvas id="bg-cube"></canvas>` as the first child inside `<body>`.

- Add Tailwind utility classes `relative z-10` to the `<nav>` and `<main>` elements so they render above the canvas.

- Add script tag before closing `</body>`:
  ```html
  <script src="js/cube.js"></script>
  ```

## Testing

1. **Visual verification**: Open `index.html` in a browser. A rotating wireframe cube should be visible centered on the page behind the "Hola a todos" text.
2. **Text readability**: Confirm that the navbar and main heading text remain fully visible and clickable on top of the cube.
3. **Responsiveness**: Resize the browser window — the canvas and cube should adapt to the new viewport size without clipping or overflow.
4. **No scrollbars**: The canvas should not introduce extra scrollbars or affect page layout.
5. **About page unaffected**: Navigate to `about.html` and confirm it is unchanged.
