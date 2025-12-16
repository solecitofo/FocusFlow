@echo off
REM FocusFlow Build Script - Requires Administrator
REM Right-click this file and select "Run as Administrator"

echo ========================================
echo FocusFlow Windows Build Script
echo ========================================
echo.

cd /d "%~dp0"

echo Limpiando directorios anteriores...
if exist release rmdir /s /q release
if exist dist rmdir /s /q dist
echo Limpeza completada.
echo.

echo Iniciando compilacion (Vite + electron-builder)...
echo Esto puede tomar 1-3 minutos...
echo.

call npm run package-win

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ Compilacion EXITOSA!
    echo ========================================
    echo.
    echo El archivo FocusFlow.exe se encuentra en:
    echo %~dp0dist\win-unpacked\FocusFlow.exe
    echo.
    echo Tamaño aproximado: 172 MB
    echo.
    echo Para ejecutar:
    echo   1. Abre el Explorador de Archivos
    echo   2. Navega a la carpeta dist\win-unpacked\
    echo   3. Haz doble-clic en FocusFlow.exe
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ Error durante la compilacion
    echo ========================================
    echo.
    echo Por favor, intenta:
    echo   1. Ejecuta este script como Administrador
    echo   2. Cierra otras instancias de Electron/Node
    echo   3. Intenta de nuevo
    echo.
)

pause
