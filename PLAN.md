# Plan: Limpiar Repo — Eliminar branches innecesarias

## Summary

Se eliminarán todas las branches locales y remotas del repositorio excepto `main`, para mantener el repo limpio y sin ramas obsoletas. Esto incluye 2 branches locales (`feat-testing`, `interactive-animation`) y 5 branches remotas (`copilot/create-html-tailwind-page`, `feat-testing`, `feature/add-readme`, `interactive-animation`, `web-test`).

## Files to Create

Ninguno.

## Files to Modify

Ninguno. Esta tarea solo involucra operaciones de Git (eliminación de branches).

## Implementation Steps

### Paso 1: Eliminar branches locales

```bash
git branch -D feat-testing
git branch -D interactive-animation
```

### Paso 2: Eliminar branches remotas

```bash
git push origin --delete copilot/create-html-tailwind-page
git push origin --delete feat-testing
git push origin --delete feature/add-readme
git push origin --delete interactive-animation
git push origin --delete web-test
```

### Paso 3: Limpiar referencias remotas obsoletas

```bash
git fetch --prune
```

## Testing

Verificar que solo queda la branch `main`:

```bash
git branch -a
```

El resultado esperado debe ser:

```
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
```
