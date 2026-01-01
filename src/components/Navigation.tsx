import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';

import logoFocusFlow from '../assets/logos/logo.png';
import iconHome from '../assets/iconos/Home.png';
import iconClock from '../assets/iconos/Clock.png';
import iconCalendar from '../assets/iconos/Calendar.png';
import iconLayers from '../assets/iconos/Layers.png';
import iconMoon from '../assets/iconos/Moon.png';
import iconSun from '../assets/iconos/Sun.png';
import iconRoutine from '../assets/iconos/Routines.png';

// Iconos personalizados

export function Navigation() {
  const { state, setView, setModoCalma } = useApp();
  const { currentView, settings } = state;
  const { modoCalma } = settings;

  // Estado para el dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const navItems: { id: ViewType; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <img src={iconHome} alt="Inicio" width={20} height={20} />, label: 'Inicio' },
    { id: 'hoy', icon: <img src={iconClock} alt="Hoy" width={20} height={20} />, label: 'Hoy' },
    { id: 'agenda', icon: <img src={iconCalendar} alt="Agenda" width={20} height={20} />, label: 'Agenda' },
    { id: 'espacios', icon: <img src={iconLayers} alt="Espacios" width={20} height={20} />, label: 'Espacios' },
    {id:  'rutinas', icon: <img src={iconRoutine} alt="Rutinas" width={20} height={20} />, label: 'Rutinas' },
  ];

  return (
    <nav className="bg-white border-slate-200 relative h-32">
      {/* Logo - Superpuesto */}
      <div className="absolute left-8 top-4/5 -translate-y-1/2 z-20">
        <img 
          src={logoFocusFlow} 
          alt="Logo FocusFlow" 
          className="w-96 h-auto"
        />
      </div>

      {/* Navegación central */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200
                ${
                  currentView === item.id
                    ? modoCalma
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-violet-100 text-violet-700'
                    : modoCalma
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Controles - Independientes */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2">
          {/* Toggle Modo Calma */}
          <button
            onClick={() => {
              console.log('Click en Modo Calma. Estado actual:', modoCalma);
              setModoCalma(!modoCalma);
            }}
            className={`p-4 rounded-xl transition-all duration-300 ${
              modoCalma
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={modoCalma ? 'Desactivar Modo Calma' : 'Activar Modo Calma'}
          >
            {modoCalma ? (
              <img src={iconMoon} alt="Modo Calma" width={32} height={32} />
            ) : (
              <img src={iconSun} alt="Modo Claro" width={32} height={32} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
      