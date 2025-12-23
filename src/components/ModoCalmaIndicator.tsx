import React from 'react';

// Custom icons
import MoonIcon from '../assets/iconos/Moon.png';

export function ModoCalmaIndicator() {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-full shadow-lg text-sm">
        <img src={MoonIcon} alt="Modo Calma" className="w-3.5 h-3.5" />
        <span>Modo Calma activado</span>
      </div>
    </div>
  );
}
