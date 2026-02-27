# Plan: Sección "Hola Mami" con imagen

## Summary

Se creará una nueva sección en `index.html` debajo del contenido principal existente con un título "Hola Mami" estilizado con los colores del proyecto, acompañado de una imagen de una mamá con su hijo. Se creará un directorio `images/` para almacenar la imagen descargada de Internet (fuente libre de derechos). La sección usará Tailwind CSS siguiendo los patrones del proyecto: layout con flexbox, tipografía colorida con `<span>` por letra, y diseño responsive. La imagen y el texto estarán lado a lado en pantallas grandes y apilados en móviles.

## Files to Create

| File | Purpose |
|------|---------|
| `images/mama-hijo.jpg` | Imagen descargada de Internet (libre de derechos) que muestra a una mamá con su hijo. Se almacena en un nuevo directorio `images/` siguiendo convenciones estándar de proyectos web. |

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | 1. Agregar una nueva sección `<section>` después del `<main>` existente (o dentro del `<main>`, después del contenido actual) con: un título `<h2>` "Hola Mami" con letras coloreadas individualmente usando `<span>` (patrón existente del proyecto), y una imagen `<img>` referenciando `images/mama-hijo.jpg`. 2. Usar clases Tailwind para layout responsive: `flex-row` en desktop y `flex-col` en móvil, centrado, con espaciado adecuado. 3. Agregar `alt` descriptivo a la imagen para accesibilidad. |

## Implementation Steps

### 1. Crear directorio `images/`

Crear el directorio `images/` en la raíz del proyecto para almacenar recursos gráficos.

### 2. Descargar imagen de mamá e hijo

Buscar y descargar una imagen libre de derechos (de fuentes como Unsplash, Pexels o Pixabay) que muestre a una mamá con su hijo. Guardarla como `images/mama-hijo.jpg`. Optimizar el tamaño si es necesario para que no sea excesivamente pesada.

### 3. Agregar sección "Hola Mami" en `index.html`

Dentro del `<main>`, después del `<p>` de bienvenida (línea 152), agregar una nueva sección con la siguiente estructura:

```html
<section class="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 mb-12 px-6">
  <img src="images/mama-hijo.jpg" alt="Mamá con su hijo" class="w-64 h-64 object-cover rounded-2xl shadow-lg" />
  <h2 class="text-4xl sm:text-6xl font-bold tracking-tight select-none">
    <span class="text-red-500">H</span><span class="text-pink-500">o</span><span class="text-yellow-400">l</span><span class="text-red-500">a</span>
    <span class="mx-1">&nbsp;</span>
    <span class="text-pink-500">M</span><span class="text-red-500">a</span><span class="text-yellow-400">m</span><span class="text-pink-500">i</span>
  </h2>
</section>
```

Detalles de diseño:
- **Layout**: `flex-col` en móvil (imagen arriba, texto abajo), `sm:flex-row` en desktop (imagen a la izquierda, texto a la derecha)
- **Imagen**: Tamaño fijo `w-64 h-64`, `object-cover` para que no se deforme, bordes redondeados `rounded-2xl` y sombra `shadow-lg`
- **Título**: Sigue el patrón de letras coloreadas con `<span>`, usando tonos cálidos (rojo, rosa, amarillo) acorde a la temática maternal
- **Espaciado**: `gap-8` entre imagen y texto, `mt-16` para separar del contenido superior, `mb-12` para espacio inferior
- **Z-index**: Hereda `relative z-10` del `<main>` padre, manteniéndose sobre el cubo 3D de fondo

### 4. Verificar la referencia a la imagen

Asegurar que la ruta `images/mama-hijo.jpg` en el atributo `src` del `<img>` coincide exactamente con la ubicación del archivo descargado.

## Testing

1. **Verificación visual**: Abrir `index.html` en el navegador y confirmar que la nueva sección aparece debajo del contenido principal con la imagen y el texto "Hola Mami" lado a lado.
2. **Carga de imagen**: Verificar que la imagen se carga correctamente sin errores 404 en la consola del navegador.
3. **Responsive**: Reducir el ancho del navegador y confirmar que en móvil la imagen y el texto se apilan verticalmente (`flex-col`) y en desktop están lado a lado (`flex-row`).
4. **Estilo consistente**: Verificar que las letras coloreadas del título siguen el mismo patrón visual que el título "Hola a todos" existente.
5. **Coexistencia**: Confirmar que el cubo 3D, la animación del avión, el heading interactivo y el modal de bienvenida siguen funcionando correctamente.
6. **Accesibilidad**: Verificar que la imagen tiene un atributo `alt` descriptivo.
