# Assets de FocusFlow

Estructura de carpetas para todos los elementos visuales de la aplicación.

## 📁 Organización

```
assets/
├── icons/           # Iconos SVG personalizados
├── images/          # Imágenes PNG, WebP, JPG
├── logos/           # Logo principal + variantes
└── illustrations/   # Ilustraciones decorativas
```

## 🎨 Guías de Importación

### SVGs como Componentes React
```javascript
// SVG debe estar en icons/ o illustrations/
import MyIcon from './assets/icons/my-icon.svg?react';

// Usar en JSX
<MyIcon className="w-6 h-6 text-blue-600" />
```

### Imágenes Estáticas
```javascript
import logo from './assets/logos/focusflow-logo.png';

// Usar en JSX
<img src={logo} alt="FocusFlow" className="w-12 h-12" />
```

## 📏 Tamaños Recomendados

### Logos
- **Favicon:** 16x16, 32x32 (en `/public`)
- **Logo principal:** 512x512 PNG + SVG
- **Logo pequeño:** 200x200 PNG

### Iconos
- **Tamaño base:** 24x24 (escala con Tailwind `w-6 h-6`)
- **Favicon:** 16x16
- **SVG:** Usar viewBox="0 0 24 24"

### Ilustraciones
- **Empty states:** 300x300 - 500x500
- **Decorativas:** Flexible

### Imágenes
- **Optimizadas:** WebP preferido, PNG como fallback
- **Máximo ancho:** 1200px
- **Compresión:** 80-85% calidad

## 🛠️ Herramientas para Crear Assets

### Iconos
- Figma (figma.com) - Diseño profesional
- Illustrator o Inkscape - SVG editables
- Blobmaker (blobmaker.app) - Shapes suaves

### Logos
- Looka.com - IA generativa
- Canva.com - Templates
- Adobe Express - Rápido

### Optimización
- SVGOMG (jakearchibald.github.io/svgomg/) - Optimizar SVGs
- TinyPNG (tinypng.com) - Comprimir PNGs
- Squoosh (squoosh.app) - Convertir a WebP

## 📝 Checklist para Nuevos Assets

- [ ] Nombre descriptivo en inglés (ej: `task-complete.svg`)
- [ ] SVGs optimizados (sin estilos innecesarios)
- [ ] Imágenes comprimidas
- [ ] Colores consistentes con paleta de la app
- [ ] Probado en las vistas donde se usa
