# Plan: Character Y-Axis Animation Based on Distance from Cursor

## Summary

Add a CSS-only interactive animation to the "Hola a todos" heading where individual letter `<span>` elements animate along the Y axis based on their proximity to the cursor. When the user hovers over a character, that character rises the most (via `translateY`), and adjacent sibling characters rise progressively less, creating a wave/ripple effect. This will be achieved using CSS `:hover` combined with adjacent sibling selectors (`+`) and the `:has()` selector for previous-sibling targeting, along with CSS transitions for smooth movement.

## Files to Create

None. All changes will be made inline in the existing `index.html`.

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add a `<style>` block with hover-based Y-axis animation using `:hover`, sibling combinators (`+`), and `:has()` for reverse-sibling targeting. Add `inline-block` and `transition` to letter spans. Adjust space spans so they participate as valid siblings in the selector chain. |

## Implementation Steps

1. **Add `<style>` block in `<head>`** with the following CSS rules scoped to `h1 > span`:
   - Base rule: `display: inline-block`, `transition: transform 0.3s ease`, `cursor: pointer`.
   - Hovered span: `transform: translateY(-24px)` (strongest lift).
   - 1-away siblings (forward: `span:hover + span`, backward: `span:has(+ span:hover)`): `transform: translateY(-16px)`.
   - 2-away siblings (forward: `span:hover + span + span`, backward: `span:has(+ span + span:hover)`): `transform: translateY(-8px)`.
   - 3-away siblings (forward/backward): `transform: translateY(-4px)`.

2. **Fix space spans**: Convert empty `<span class="mx-2"></span>` to `<span class="mx-1">&nbsp;</span>` so they occupy space and participate as valid siblings in the hover chain.

3. **Scope animation rules** to `h1 > span` only, keeping the subtitle `<p>` unaffected.

4. **Fine-tune values**: Adjust `translateY` distances and `transition` duration/easing for a natural wave feel.

## CSS Technique Details

The key CSS selectors:

```css
/* The hovered character */
h1 > span:hover {
  transform: translateY(-24px);
}

/* Next sibling (1 away) */
h1 > span:hover + span {
  transform: translateY(-16px);
}

/* Previous sibling (1 away) — uses :has() */
h1 > span:has(+ span:hover) {
  transform: translateY(-16px);
}

/* 2 away forward */
h1 > span:hover + span + span {
  transform: translateY(-8px);
}

/* 2 away backward */
h1 > span:has(+ span + span:hover) {
  transform: translateY(-8px);
}

/* 3 away forward */
h1 > span:hover + span + span + span {
  transform: translateY(-4px);
}

/* 3 away backward */
h1 > span:has(+ span + span + span:hover) {
  transform: translateY(-4px);
}
```

The `:has()` selector is supported in all modern browsers (Chrome 105+, Safari 15.4+, Firefox 121+).

## Testing

1. **Open `index.html` in a modern browser** (Chrome, Firefox, Safari).
2. **Hover over individual letters** — the hovered letter should rise the most, neighbors should rise progressively less, creating a wave.
3. **Move the cursor across the text** — the wave should follow smoothly due to CSS transitions.
4. **Verify the subtitle** ("Bienvenidos a nuestra página") is not affected.
5. **Verify spacing** between words is preserved.
6. **Test responsiveness** — animation should work at both mobile and desktop text sizes.
7. **Test browser compatibility** — confirm `:has()` selector works in Chrome, Firefox, and Safari.
