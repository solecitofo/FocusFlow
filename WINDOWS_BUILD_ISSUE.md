# ⚠️ Nota Sobre Compilación en Windows

## Problema Conocido

En algunos sistemas Windows, electron-builder puede tener problemas con archivos bloqueados durante el empaquetado. Esto es una limitación del sistema operativo.

## ✅ Soluciones Alternativas

### Opción 1: Usar GitHub Actions (Recomendado)
El empaquetado se hace automáticamente en servidores GitHub cuando haces push:

```bash
git push origin main
# → Va a GitHub Actions → Crea el .exe automáticamente
# → Descarga desde Releases
```

### Opción 2: Ejecutable Temporal
Mientras se resuelve el problema, usa:

```bash
cd C:\Users\Sol\Desktop\FocusFlow
npm run dev              # Terminal 1: Dev server
npm run electron-dev     # Terminal 2: Ejecutar app
```

Esto abre la app Directly desde el código sin instalar.

### Opción 3: Esperar y Reintentar
A veces VS Code o Windows Explorer tienen abierta la carpeta:
1. Cierra VS Code completamente
2. Abre Task Manager (Ctrl+Shift+Esc)
3. Busca procesos "node", "electron", "handle"
4. Cierra todos
5. Reinicia una terminal nueva
6. Ejecuta `npm run package-win`

### Opción 4: Crear en Otra Máquina
Si el problema persiste, prueba en:
- Otra PC Windows
- WSL2 (Windows Subsystem for Linux)
- Máquina virtual
- GitHub Actions (automático)

---

## 🔄 GitHub Actions para Auto-Build

Se puede configurar para que cada vez que hagas push, automáticamente:
1. Compila el código
2. Crea .exe para Windows
3. Genera DMG para Mac
4. Crea AppImage para Linux
5. Los deja disponibles en Releases

(Requiere GitHub pro o configuración adicional)

---

## 📝 Alternativa: Instalador NSIS Manual

Si necesitas el NSIS:

```bash
# 1. Instala NSIS: https://sourceforge.net/projects/nsis/files/
# 2. Limpia completamente
Remove-Item -Recurse -Force release, dist, node_modules -ErrorAction SilentlyContinue

# 3. Reinstala y compila
npm install
npm run build
npm run package-win
```

---

**¿Necesitas ayuda con otra opción?**
