#!/bin/bash

echo "🔨 FocusFlow Build Script para Windows"
echo "======================================"

# Limpiar completamente
echo "🧹 Limpiando carpetas..."
rm -rf release dist node_modules/.cache

# Build Vite
echo "📦 Compilando con Vite..."
npm run build

# Empaquetar con Electron
echo "🚀 Creando ejecutable..."
npx electron-builder --win --config.buildDependenciesFromSource=true

echo "✅ ¡Listo!"
echo "📍 Tu instalador está en: ./release/"
