# Guía de Empaquetado - FocusFlow

## 🪟 Windows - Crear Instalador .exe

### Requisitos
- Node.js 16+
- npm 8+
- Windows 7 o superior

### Pasos

**1. Compilar el proyecto:**
```bash
npm run package-win
```

**2. Esperar a que termine** (~2-3 minutos)
Se creará en: `release/FocusFlow-Setup-1.0.0.exe`

**3. Distribuir el .exe**
- El instalador es independiente y se puede ejecutar en cualquier Windows
- Se instala en: `C:\Users\[usuario]\AppData\Local\FocusFlow`
- Crea acceso directo en: Inicio > FocusFlow

### Características del Instalador
✅ Instalador visual (NSIS)
✅ Opción de elegir ubicación de instalación
✅ Crea acceso directo en escritorio
✅ Integración en menú Inicio
✅ Desinstalador automático

---

## 🍎 macOS - Crear DMG

```bash
npm run package-mac
```
Se creará: `release/FocusFlow-1.0.0.dmg`

---

## 🐧 Linux - Crear AppImage

```bash
npm run package-linux
```
Se creará: `release/FocusFlow-1.0.0.AppImage`

---

## 📦 Estructura de Archivos

```
release/
├── FocusFlow-Setup-1.0.0.exe       (Instalador Windows)
├── FocusFlow 1.0.0.dmg             (Instalador macOS)
└── FocusFlow-1.0.0.AppImage        (Aplicación Linux)
```

---

## 🔧 Configuración de Instalador (package.json)

### Windows (NSIS)
```json
"nsis": {
  "oneClick": false,                    // Permite elegir ubicación
  "allowToChangeInstallationDirectory": true,
  "createDesktopShortcut": true,        // Acceso directo en escritorio
  "createStartMenuShortcut": true,      // En menú Inicio
  "shortcutName": "FocusFlow"
}
```

---

## 🚀 Cambios Futuros

Para cambiar la versión:
1. Edita `package.json` → `"version": "1.0.1"`
2. Vuelve a ejecutar `npm run package-win`
3. Se creará `FocusFlow-Setup-1.0.1.exe`

---

## ⚙️ Solución de Problemas

### Error: "Cannot find module"
→ Ejecuta: `npm install`

### Error de ícono
→ Asegúrate de que existe: `build/icon.png`

### El instalador es muy grande
→ Normal (500MB+), incluye Node.js runtime

### Antivirus detecta como amenaza
→ Algunos antivirus marcan aplicaciones nuevas, firmado digitalmente lo resuelve

---

## 📝 Notas

- El instalador es **auto-contenido** (no requiere dependencias externas)
- Se actualiza **manualmente** (no incluye auto-update por ahora)
- Funciona offline después de instalarse
- Los datos se guardan en `AppData\Local\FocusFlow`
