# 🚀 Cómo Instalar FocusFlow en Windows

## Método 1: Descarga el .exe desde GitHub (⭐ RECOMENDADO)

### Pasos:
1. **Ir a GitHub Releases:**
   - https://github.com/solecitofo/FocusFlow/releases

2. **Descargar el .exe:**
   - Busca `FocusFlow-Setup-X.X.X.exe` o `FocusFlow.exe`
   - Haz clic en descargar

3. **Ejecutar el instalador:**
   - Doble-clic en el archivo descargado
   - Sigue el asistente de instalación

4. **Listo:**
   - Se crea acceso directo en Escritorio
   - Se instala en: `C:\Users\[tu-usuario]\AppData\Local\FocusFlow`
   - Abre desde: Inicio > Busca "FocusFlow"

---

## Método 2: Crear .exe Localmente (Avanzado)

Si quieres compilar tu propia versión:

### Requisitos:
- Node.js 16+ (descarga desde nodejs.org)
- npm (viene con Node.js)
- Git

### Pasos:

**1. Clonar el repositorio:**
```bash
git clone https://github.com/solecitofo/FocusFlow.git
cd FocusFlow
```

**2. Instalar dependencias:**
```bash
npm install
```

**3. Compilar para Windows:**
```bash
npm run package-win
```

⏳ Espera 3-5 minutos...

**4. Tu .exe estará en:**
```
FocusFlow/release/FocusFlow.exe
```

Cópialo donde quieras y comparte.

---

## Método 3: Ejecutar sin Instalar (Desarrollo)

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run electron-dev
```

Se abre directamente. Perfecto para probar cambios.

---

## 📋 Qué Instalar

Si tienes Windows sin Node.js:

1. **Node.js:**
   - Descarga desde: https://nodejs.org (versión LTS)
   - Ejecuta el instalador
   - Reinicia Windows

2. **Git (opcional pero recomendado):**
   - Descarga desde: https://git-scm.com
   - Ejecuta el instalador

3. **Vuelve a intentar el Método 2**

---

## ✅ Verificar que Está Instalado

**Node.js y npm:**
```bash
node --version
npm --version
```

Deberían mostrarte versiones (ej: v18.17.1)

---

## 🆘 Problemas?

### "Windows Protegió tu PC"
- Haz clic en: Más información
- Botón: Ejecutar de todas formas

### "Antivirus la bloquea"
- Es normal en apps nuevas
- Haz clic en: Permitir

### "No se puede ejecutar npm"
- Node.js no está instalado correctamente
- Reinstala desde: nodejs.org
- Reinicia Windows

### "El .exe no se ejecuta"
- Baja desde Releases (es más seguro)
- O compila con: `npm run package-win`

---

## 📞 Soporte

Si tienes problemas:
1. Abre GitHub Issue: github.com/solecitofo/FocusFlow/issues
2. Describe el problema
3. Incluye: versión de Windows, versión de Node.js

---

## 🎉 ¡Listo!

FocusFlow está diseñado para funcionar sin conexión a internet después de instalarse.

**Disfruta gestionando tus tareas sin distracciones** 🎯
