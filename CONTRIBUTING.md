# Contribuir a FocusFlow

Gracias por tu interes en contribuir a FocusFlow! Esta guia te ayudara a empezar.

## Tabla de Contenidos

- [Codigo de Conducta](#codigo-de-conducta)
- [Como Contribuir](#como-contribuir)
- [Configuracion del Entorno](#configuracion-del-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guia de Estilo](#guia-de-estilo)
- [Proceso de Pull Request](#proceso-de-pull-request)

## Codigo de Conducta

Este proyecto esta comprometido con proporcionar un ambiente acogedor e inclusivo. Por favor, se respetuoso con todos los contribuidores.

## Como Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado antes
2. Crea un nuevo issue usando la plantilla de bug
3. Incluye pasos claros para reproducir el problema

### Sugerir Funcionalidades

1. Revisa los issues existentes para evitar duplicados
2. Crea un issue usando la plantilla de feature request
3. Explica como beneficiaria a usuarios con TDAH

### Contribuir Codigo

1. Haz fork del repositorio
2. Crea una rama desde `develop`: `git checkout -b feature/mi-funcionalidad`
3. Haz tus cambios siguiendo la guia de estilo
4. Commit con mensajes descriptivos
5. Push y crea un Pull Request hacia `develop`

## Configuracion del Entorno

### Requisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Git

### Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/solecitofo/FocusFlow.git
cd FocusFlow

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# En otra terminal, iniciar Electron
npm run electron-dev
```

### Scripts Disponibles

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Compilar para produccion |
| `npm run electron-dev` | Ejecutar Electron en desarrollo |
| `npm start` | Desarrollo completo (Vite + Electron) |
| `npm run electron-build` | Crear ejecutable Windows |

## Estructura del Proyecto

```
src/
├── assets/          # Iconos, imagenes, logos
├── components/      # Componentes React reutilizables
├── views/           # Vistas/paginas principales
├── context/         # Estado global (AppContext)
├── types/           # Definiciones TypeScript
├── utils/           # Funciones utilitarias
├── App.tsx          # Componente raiz
└── main.tsx         # Punto de entrada
```

### Componentes Clave

- **AppContext.tsx**: Manejo de estado global con Context API + useReducer
- **Navigation.tsx**: Barra de navegacion lateral
- **IdeaCard.tsx**: Tarjeta para mostrar ideas/tareas
- **QuickCapture.tsx**: Modal de captura rapida

## Guia de Estilo

### TypeScript

- Usa tipos explicitos, evita `any`
- Define interfaces en `src/types/index.ts`
- Usa nombres descriptivos para variables y funciones

### React

- Componentes funcionales con hooks
- Un componente por archivo
- Props tipadas con interfaces

### CSS / Tailwind

- Usa clases de Tailwind en lugar de CSS personalizado
- Agrupa clases logicamente: layout, spacing, colors, etc.
- Usa el sistema de colores definido en el proyecto

### Commits

Usa mensajes descriptivos en espanol o ingles:

```
feat: agregar vista de estadisticas
fix: corregir error en captura rapida
docs: actualizar README
style: formatear codigo de HoyView
refactor: simplificar logica de AppContext
```

## Proceso de Pull Request

1. **Asegurate** de que tu codigo compile sin errores
2. **Actualiza** la documentacion si es necesario
3. **Describe** claramente los cambios en el PR
4. **Vincula** el issue relacionado si existe
5. **Espera** la revision del equipo

### Checklist del PR

- [ ] El codigo compila (`npm run build`)
- [ ] Sigue la guia de estilo
- [ ] Documentacion actualizada si aplica
- [ ] Sin conflictos con la rama base

## Principios de Diseno para TDAH

FocusFlow esta disenado para personas con TDAH. Al contribuir, ten en cuenta:

1. **Reducir sobrecarga cognitiva**: Interfaces simples y claras
2. **Acciones rapidas**: Minimizar pasos para completar tareas
3. **Retroalimentacion visual**: Indicadores claros de estado
4. **Flexibilidad**: Diferentes modos segun el estado de energia
5. **Sin distracciones**: Evitar elementos innecesarios

## Preguntas?

Si tienes dudas, abre una discusion en GitHub o contacta al equipo.

---

Gracias por ayudar a hacer FocusFlow mejor!
