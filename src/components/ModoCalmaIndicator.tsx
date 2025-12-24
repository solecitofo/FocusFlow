// ...existing code...
import { Moon } from 'lucide-react';

export function ModoCalmaIndicator() {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-full shadow-lg text-sm">
        <Moon size={14} />
        <span>Modo Calma activado</span>
      </div>
    </div>
  );
}
