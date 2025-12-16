// GUÍA DE IMPORTACIÓN DE ASSETS EN APP.JSX
// =========================================

// OPCIÓN 1: Importar SVGs como componentes React
// import HomeIcon from '../assets/icons/home.svg?react';
// import QuickIcon from '../assets/icons/quick-capture.svg?react';
// import DetailedIcon from '../assets/icons/detailed-capture.svg?react';
// import ListIcon from '../assets/icons/task-list.svg?react';
// import AchievementsIcon from '../assets/icons/achievements.svg?react';
// import CompleteIcon from '../assets/icons/complete.svg?react';

// Uso:
// <HomeIcon className="w-10 h-10 text-purple-600" />

// OPCIÓN 2: Importar imágenes estáticas
// import logoImg from '../assets/logos/focusflow-logo.svg';
// <img src={logoImg} alt="FocusFlow" className="w-12 h-12" />

// OPCIÓN 3: Data URLs para SVGs pequeños (inline)
// Útil para favicons o iconos muy pequeños

// =========================================
// PASOS PARA REEMPLAZAR LUCIDE CON TUS ICONOS:
// =========================================
// 1. Descarga/diseña tu SVG
// 2. Guárdalo en src/assets/icons/
// 3. Importa con: import MyIcon from '../assets/icons/myicon.svg?react';
// 4. Reemplaza: <Lucide.Icon /> con <MyIcon className="w-6 h-6" />
// 5. Asegúrate de que el SVG tenga viewBox="0 0 24 24" para consistencia

// =========================================
// ARCHIVOS TEMPLATE CREADOS:
// =========================================
// ✅ src/assets/icons/home.svg
// ✅ src/assets/icons/quick-capture.svg
// ✅ src/assets/icons/detailed-capture.svg
// ✅ src/assets/icons/task-list.svg
// ✅ src/assets/icons/achievements.svg
// ✅ src/assets/icons/complete.svg
// ✅ src/assets/logos/focusflow-logo.svg

// Personaliza estos con tu propio diseño usando:
// - Figma (figma.com)
// - Illustrator
// - Inkscape (gratis)
// - Online: blobmaker.app, svgeditor.app
