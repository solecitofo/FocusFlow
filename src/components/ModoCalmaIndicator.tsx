import { type FC } from 'react';
import iconMoon from '../assets/iconos/Moon.png';

export const ModoCalmaIndicator: FC = () => {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-full shadow-lg text-sm">
        <img src={iconMoon} alt="Modo Calma" width={14} height={14} />
        <span>Modo Calma activado</span>
      </div>
    </div>
  );
};
