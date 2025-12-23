import React from 'react';
import { useApp } from '../context/AppContext';
import { ViewType, LAYERS, LayerType } from '../types';

// Custom icons
import HomeIcon from '../assets/iconos/Home.png';
import CalendarIcon from '../assets/iconos/Calendar.png';
import LayersIcon from '../assets/iconos/Layers.png';
import SettingsIcon from '../assets/iconos/Settings.png';
import SunIcon from '../assets/iconos/Sun.png';
import MoonIcon from '../assets/iconos/Moon.png';
import ClockIcon from '../assets/iconos/Clock.png';

export function Navigation() {
  const { state, setView, setModoCalma, setCapaActiva } = useApp();
  const { currentView, settings } = state;
  const { modoCalma, capaActiva } = settings;

  const navItems: { id: ViewType; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <img src={HomeIcon} alt="Inicio" className="w-5 h-5" />, label: 'Inicio' },
    { id: 'hoy', icon: <img src={ClockIcon} alt="Hoy" className="w-5 h-5" />, label: 'Hoy' },
    { id: 'calendario', icon: <img src={CalendarIcon} alt="Calendario" className="w-5 h-5" />, label: 'Calendario' },
    { id: 'espacios', icon: <img src={LayersIcon} alt="Espacios" className="w-5 h-5" />, label: 'Espacios' },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-colors duration-300 ${
        modoCalma
          ? 'bg-slate-50/90 border-slate-200'
          : 'bg-white/80 border-slate-100'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`text-2xl font-bold bg-clip-text text-transparent ${
                modoCalma
                  ? 'bg-slate-700'
                  : 'bg-gradient-to-r from-violet-600 to-blue-600'
              }`}
              style={{ WebkitBackgroundClip: 'text' }}
            >
              FocusFlow
            </div>
          </div>

          {/* Navegación principal */}
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

          {/* Controles adicionales */}
          <div className="flex items-center gap-3">
            {/* Selector de capa */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setCapaActiva('todas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${
                    capaActiva === 'todas'
                      ? 'bg-slate-200 text-slate-800'
                      : 'text-slate-500 hover:bg-slate-100'
                  }
                `}
              >
                Todas
              </button>
              {Object.values(LAYERS).map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setCapaActiva(layer.id as LayerType)}
                  className={`px-2 py-1.5 rounded-lg text-sm transition-all
                    ${
                      capaActiva === layer.id
                        ? `${layer.bgColor} ${layer.color}`
                        : 'opacity-50 hover:opacity-100'
                    }
                  `}
                  title={layer.name}
                >
                  {layer.icon}
                </button>
              ))}
            </div>

            {/* Toggle Modo Calma */}
            <button
              onClick={() => setModoCalma(!modoCalma)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                modoCalma
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={modoCalma ? 'Desactivar Modo Calma' : 'Activar Modo Calma'}
            >
              {modoCalma ? <img src={MoonIcon} alt="Modo Calma" className="w-5 h-5" /> : <img src={SunIcon} alt="Modo Normal" className="w-5 h-5" />}
            </button>

            {/* Configuración */}
            <button
              onClick={() => setView('configuracion')}
              className={`p-2 rounded-xl transition-all ${
                currentView === 'configuracion'
                  ? 'bg-slate-200 text-slate-800'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <img src={SettingsIcon} alt="Configuración" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
