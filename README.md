# FocusFlow

**Gestor de tareas para personas con TDAH** diseñado para capturar ideas rápidamente con mínima carga cognitiva. Interfaz clara con reloj prominente, modos de captura ágiles y sistema de recompensas motivador.

---

## 🚀 Características

- ⏰ **Reloj en tiempo real** - Siempre visible en la pantalla principal
- 💨 **Captura rápida** - Guarda ideas en segundos (solo título)
- 📝 **Captura detallada** - Agrega descripción y contexto cuando necesites
- ✅ **Gestión de tareas** - Lista clara y accesible de tareas activas
- 🎉 **Sistema de recompensas** - Celebra cada tarea completada
- 🏆 **Tablero de logros** - Visualiza tus tareas completadas
- 📱 **Interfaz TDAH-friendly** - Diseño limpio sin distracciones innecesarias
- 🌍 **Interfaz en español** - Localizadas todas las fechas y formatos

---

## 💻 Tecnología

- **Frontend:** React 18 + Tailwind CSS 4.1
- **Desktop:** Electron 27
- **Build:** Vite 5
- **Icons:** Lucide React
- **Language:** JavaScript (ESM)

---

## 📋 Requisitos Previos

- Node.js 16+ 
- npm 8+
- Git

---

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/solecitofo/FocusFlow.git
cd FocusFlow

# Instalar dependencias
npm install
```

---

## 🏃 Desarrollo

Ejecuta dos terminales en paralelo:

**Terminal 1 - Vite Dev Server:**
```bash
npm run dev
```
Abre http://localhost:5173 en el navegador.

**Terminal 2 - Electron App:**
```bash
npm run electron-dev
```
Lanza la app de escritorio. Los cambios se recargan automáticamente.

---

## 🔨 Build & Empaquetado

### Build para Producción
```bash
npm run build
```
Genera la carpeta `dist/` optimizada.

### Empaquetar como Instalador

**Windows (NSIS):**
```bash
npm run package-win
```

**macOS (DMG):**
```bash
npm run package-mac
```

**Linux (AppImage):**
```bash
npm run package-linux
```

Los instaladores se generan en la carpeta `release/`.

---

## 📁 Estructura del Proyecto

```
FocusFlow/
├── src/
│   ├── assets/              # Logos, iconos, imágenes
│   │   ├── icons/           # Iconos SVG personalizados
│   │   ├── images/          # Imágenes PNG/WebP
│   │   ├── logos/           # Logo principal
│   │   └── illustrations/   # Ilustraciones decorativas
│   ├── App.jsx              # Componente React principal (monolítico)
│   ├── main.jsx             # Punto de entrada React
│   ├── index.css            # Estilos Tailwind
│   └── ASSETS_GUIDE.md      # Guía de cómo usar assets
├── public/                  # Assets estáticos para app
├── electron.js              # Proceso principal de Electron
├── vite.config.js           # Configuración de Vite
├── index.html               # Template HTML
├── package.json             # Dependencias y scripts
└── .github/
    └── copilot-instructions.md  # Guía para agentes de IA
```

---

## 📝 Estructura de Tareas

```javascript
{
  id: 1702728000000,              // Timestamp único
  title: "Llamar a dentista",     // Requerido
  description: "Pedir cita para limpieza", // Opcional
  type: "quick" | "detailed",     // Tipo de captura
  createdAt: "2025-12-16T...",    // ISO8601
  completedAt: "2025-12-16T..."   // Solo en tareas completadas
}
```

---

## 🗂️ Vistas de la Aplicación

| Vista | Descripción |
|-------|-------------|
| **Home** | Dashboard con hora, 4 botones de acción rápida |
| **Quick** | Captura rápida (solo título) |
| **Detailed** | Captura completa (título + descripción) |
| **List** | Lista de tareas activas |
| **Detail** | Editar/completar tarea individual |
| **Achievements** | Tareas completadas + ideas de recompensas |

---

## 🎨 Personalización

### Assets (Logos, Iconos, Imágenes)
La aplicación está lista para usar tus propios diseños:

**Estructura de carpetas:**
- `src/assets/icons/` - Iconos SVG personalizados (6 iconos template listos)
- `src/assets/logos/` - Logo principal + variantes
- `src/assets/images/` - Imágenes PNG/WebP
- `src/assets/illustrations/` - Ilustraciones decorativas
- `public/` - Assets estáticos (favicon, etc.)

**Cómo usar tus assets:**
```javascript
// Importar SVG como componente React
import MyIcon from './assets/icons/my-icon.svg?react';
<MyIcon className="w-6 h-6 text-blue-600" />

// Importar imagen
import logo from './assets/logos/my-logo.png';
<img src={logo} alt="Logo" className="w-12 h-12" />
```

Ver [src/ASSETS_GUIDE.md](src/ASSETS_GUIDE.md) y [src/assets/README.md](src/assets/README.md) para documentación completa.

### Colores por Vista
- **Quick Capture:** Azul (`blue-600`)
- **Detailed Capture:** Púrpura (`purple-600`)
- **Task List:** Verde (`green-600`)
- **Achievements:** Amarillo/Naranja (`yellow-600`, `orange-600`)

Edita los gradientes en [src/App.jsx](src/App.jsx) (líneas con `bg-gradient-to-br`).

### Mensajes de Recompensa
Modifica el array `rewards` en [src/App.jsx](src/App.jsx) para cambiar emojis y mensajes.

---

## 💾 Persistencia de Datos

Los datos se guardan en `localStorage` mediante `window.storage.get/set()`. 

**Nota:** La integración IPC con Electron está pendiente. Ver [.github/copilot-instructions.md](.github/copilot-instructions.md#critical-integration-points) para detalles.

---

## 🐛 Debugging

**Abrir DevTools en desarrollo:**
```bash
npm run electron-dev
# DevTools se abre automáticamente
```

**Ver logs de Electron:**
```bash
npm run electron-dev 2>&1 | tee electron.log
```

---

## 📚 Documentación Adicional

Para información detallada sobre patrones de desarrollo, convenciones y arquitectura, ver [`.github/copilot-instructions.md`](.github/copilot-instructions.md).

---

## 📄 Licencia

MIT

---

## 👤 Autor

[solecitofo](https://github.com/solecitofo)

---

## 💡 Contribuciones

Las contribuciones son bienvenidas. Para cambios mayores:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request 
