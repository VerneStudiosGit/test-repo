# Plan: Add Navigation Bar

## Summary

Add a responsive navigation bar to the existing `index.html` page. The navbar will include "Home" and "About Us" links, styled with Tailwind CSS to match the existing colorful design. Since this is a single-page vanilla HTML project using Tailwind via CDN, the navbar will be added directly to `index.html` and an `about.html` page will be created for the "About Us" link. After implementation, a pull request will be created from `feat-testing` to `main` and merged.

## Files to Create

| File | Purpose |
|------|---------|
| `about.html` | "About Us" page with consistent styling and the same navbar |

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add a `<nav>` element at the top of the `<body>` with "Home" and "About Us" links. Adjust body layout so the navbar sits at the top while the main content remains centered. |

## Implementation Steps

1. **Modify `index.html` layout** — Change the body from full-page centered flex to a column layout with the navbar at the top and a `<main>` wrapper that centers the existing content in the remaining space.

2. **Add `<nav>` to `index.html`** — Insert a navigation bar at the top of the body with:
   - A site title/logo on the left
   - "Home" and "About Us" links on the right
   - Tailwind classes for styling (white background, shadow, padding, responsive)

3. **Create `about.html`** — Build a simple "About Us" page that:
   - Uses the same Tailwind CDN setup
   - Includes the same navbar (with "About Us" highlighted as active)
   - Has placeholder content for the about section

4. **Commit changes** to `feat-testing` branch.

5. **Create a pull request** from `feat-testing` → `main`.

6. **Merge the pull request** into `main`.

## Testing

- Open `index.html` in a browser and verify the navbar appears at the top with "Home" and "About Us" links.
- Click "About Us" to confirm it navigates to `about.html`.
- Click "Home" on the about page to confirm it navigates back to `index.html`.
- Verify the original colorful heading and welcome text are still centered on the page.
- Resize the browser to confirm the navbar is responsive on smaller screens.
