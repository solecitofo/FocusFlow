# FocusFlow

**Aplicación de escritorio para gestión de tareas diseñada específicamente para personas con TDAH**

FocusFlow es una aplicación Electron + React que ayuda a organizar ideas, tareas y proyectos con un enfoque visual y amigable, optimizado para personas con TDAH.

![FocusFlow](src/assets/logos/logo.png)

## 🌟 Características Principales

- **Vista "Hoy"**: Visualiza todas tus tareas programadas para el día actual
- **Captura Rápida**: Guarda ideas al instante sin distracciones
- **Bloques de Energía**: Organiza tareas según tu nivel de energía (alta, media, baja)
- **Capas de Organización**: Clasifica por Personal, Trabajo, Proyectos, Inspiración y Referencias
- **Modo Calma**: Interfaz simplificada para reducir la sobrecarga visual
- **Vista de Calendario**: Planifica tareas por fecha
- **Agenda de Eventos**: Gestiona recordatorios y obligaciones
- **Rutinas**: Crea y gestiona rutinas recurrentes
- **Sistema de Estados**: Semilla → En Desarrollo → Lista

## 🛠️ Tecnologías

- **Frontend**: React 19.2.3 + TypeScript 5.9.3
- **Build Tool**: Vite 7.3.0
- **Desktop**: Electron 33.4.11
- **Estilos**: Tailwind CSS 4.1.18
- **Iconos**: Lucide React + iconos personalizados
- **Drag & Drop**: @dnd-kit
- **Servidor en Producción**: Express 5.2.1
- **Empaquetado**: Electron Builder 26.0.12

## 📦 Instalación

### Requisitos Previos

- Node.js 18+ 
- npm 9+

### Clonar e Instalar

```bash
git clone <repository-url>
cd FocusFlow
npm install
```

## 🚀 Scripts Disponibles

### Desarrollo

```bash
# Ejecutar servidor de desarrollo Vite
npm run dev

# Ejecutar app Electron en modo desarrollo
npm run electron-dev

# Ejecutar ambos simultáneamente
npm start
```

El servidor de desarrollo se ejecuta en `http://localhost:5173`

### Producción

```bash
# Compilar aplicación React
npm run build

# Generar ejecutables para Windows (.exe)
npm run electron-build
```

Los ejecutables se generan en la carpeta `dist/`:
- `FocusFlow 1.0.0.exe` - Ejecutable portable
- `FocusFlow Setup 1.0.0.exe` - Instalador NSIS

## 📁 Estructura del Proyecto

```
FocusFlow/
├── src/
│   ├── assets/          # Imágenes, iconos y recursos
│   ├── components/      # Componentes reutilizables
│   ├── context/         # AppContext (estado global)
│   ├── types/           # Definiciones TypeScript
│   ├── utils/           # Utilidades (fechas, etc.)
│   ├── views/           # Vistas principales
│   ├── App.tsx          # Componente raíz
│   ├── main.tsx         # Punto de entrada React
│   └── index.css        # Estilos globales + Tailwind
├── build/               # Build de producción (Vite output)
├── dist/                # Ejecutables generados (Electron Builder)
├── electron.js          # Proceso principal de Electron
├── index.html           # HTML de entrada
├── vite.config.ts       # Configuración de Vite
├── tailwind.config.cjs  # Configuración de Tailwind CSS
├── postcss.config.cjs   # Configuración de PostCSS
└── package.json         # Dependencias y scripts
```

## ⚙️ Configuración

### Electron

El archivo `electron.js` configura:
- Ventana de 1200x800px
- Servidor Express local (puerto 3000) para servir archivos en producción
- Detección automática de modo desarrollo/producción
- Cierre correcto del servidor al salir

### Vite

Configurado para:
- Base path relativa (`./`) para compatibilidad con Electron
- Output en carpeta `build/`
- Optimización de assets y code splitting

### Tailwind CSS

- Configuración en `tailwind.config.cjs`
- Plugin PostCSS: `@tailwindcss/postcss`
- Procesamiento automático en build

## 🎨 Vistas Disponibles

- **Home**: Dashboard principal con resumen
- **Hoy**: Tareas del día actual
- **Captura**: Formulario de captura rápida
- **Calendario**: Vista mensual de tareas
- **Agenda**: Eventos y recordatorios
- **Espacios**: Organización por capas
- **Rutinas**: Gestión de rutinas activas
- **Configuración**: Ajustes de la app

## 🐛 Solución de Problemas

### Error: `require is not defined`
- **Causa**: Uso de `require()` en código ES Modules
- **Solución**: Usar `import` en lugar de `require` para assets

### Pantalla en blanco en .exe
- **Causa**: Rutas incorrectas o falta configuración PostCSS
- **Solución**: Verificar `base: './'` en vite.config y que Express sirva desde `build/`

### Estilos no cargan en producción
- **Causa**: Falta plugin `@tailwindcss/postcss`
- **Solución**: `npm install -D @tailwindcss/postcss`

## 📝 Notas de Desarrollo

- El estado global se maneja con Context API (`AppContext.tsx`)
- Persistencia local pendiente de implementar (window.storage placeholder)
- CommonJS usado en `electron.js` por compatibilidad
- Express 5 requiere regex para rutas catch-all (`/.*/`)

## 📄 Licencia

ISC

## 👥 Autor

FocusFlow - Aplicación de gestión de tareas para TDAH

---

**Versión**: 1.0.0  
**Última actualización**: 1 de enero de 2026
