if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

function updateThemeButton() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = document.documentElement.classList.contains('dark');
    // If dark, show Sun (to switch to light). If light, show Moon (to switch to dark).
    btn.textContent = isDark ? '☀️' : '🌙';
}

function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
  updateThemeButton();
}


document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
        updateThemeButton();
    }
});
