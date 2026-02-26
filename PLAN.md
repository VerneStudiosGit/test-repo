# Plan: Página web de bienvenida "Hola a todos"

## Summary

Create a static HTML welcome page using Tailwind CSS (via CDN) that displays "Hola a todos" with a colorful, Google-inspired style on a white background. The page will be created on the `web-test` branch and a Pull Request will be opened to merge it into `main`.

## Files to Create

- **index.html**: Static HTML page with Tailwind CSS (CDN) displaying "Hola a todos" in colorful Google-style letters on a white background. Will include a clean, centered layout with multi-colored text similar to the Google logo aesthetic.

## Files to Modify

None. This is a new page added to the repository.

## Implementation Steps

1. **Create `index.html`** in the repository root with:
   - HTML5 boilerplate
   - Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com">`)
   - White background, centered content (flexbox)
   - "Hola a todos" heading with individual letters colored in Google brand colors (blue, red, yellow, blue, green, red pattern)
   - Clean, modern typography using a sans-serif font
   - Optional subtitle or decorative element for visual polish

2. **Commit the changes** on the `web-test` branch with a descriptive commit message.

3. **Push the branch** to the remote: `git push -u origin web-test`

4. **Create a Pull Request** from `web-test` to `main` using `gh pr create` with:
   - Title: "feat: Add welcome page with colorful Google-style greeting"
   - Body describing the new static page and what it contains

## Testing

- Open `index.html` in a browser and verify:
  - White background is displayed
  - "Hola a todos" appears centered on the page
  - Letters are colored in a Google-like multi-color pattern
  - Page is responsive and looks good on different screen sizes
- Run `git status` to confirm the commit is clean
- Run `gh pr view` to confirm the PR was created correctly targeting `main`
