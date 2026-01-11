import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, formatTime } from '../utils/dateUtils';
import { IdeaCard } from '../components/IdeaCard';
import { QuickCapture } from '../components/QuickCapture';
import { AgendaCapture } from '../components/AgendaCapture';
import { useRutinasActivas } from '../hooks/useRutinas';


// Iconos personalizados (importación estática para Vite/React)
import iconLayers from '../assets/iconos/Layers.png';
import iconTrendingUp from '../assets/iconos/TrendingUp.png';
import iconClock from '../assets/iconos/Clock.png';
import iconZap from '../assets/iconos/Zap.png';
import iconCalendar from '../assets/iconos/Calendar.png';
import iconSparkles from '../assets/iconos/Sparkles.png';
import enConstruccion from '../assets/illustrations/Enconstruccion.png';

import RoutineBuilder from '../components/RoutineBuilder';

export function HomeView() {
  const { state, setView, getIdeasHoy, getIdeasActivas, toggleQuickCapture } = useApp();
  const [showQuickCapture, setShowQuickCapture] = useState(false);
  const [showAgendaCapture, setShowAgendaCapture] = useState(false);
  const { modoCalma } = state.settings;
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Use centralized storage hook instead of direct localStorage
  const { rutinas: rutinasActivas, loading: loadingRutinas } = useRutinasActivas();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const ideasHoy = getIdeasHoy();
  const ideasActivas = getIdeasActivas();
  const urgentes = ideasActivas.filter((i) => i.isUrgent);

  const stats = [
    {
      label: 'Rutinas activas',
      value: loadingRutinas ? '...' : rutinasActivas.length,
      icon: <img src={iconLayers} alt="Rutinas" width={32} height={32} />, 
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Ideas activas',
      value: ideasActivas.length,
      icon: <img src={iconTrendingUp} alt="Ideas activas" width={32} height={32} />, 
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Para hoy',
      value: ideasHoy.length,
      icon: <img src={iconClock} alt="Para hoy" width={32} height={32} />, 
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Urgentes',
      value: urgentes.length,
      icon: <img src={iconZap} alt="Urgentes" width={32} height={3} />, 
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);
  const quickActions = [
    {
      label: 'Captura rápida',
      icon: <img src={iconZap} alt="Captura rápida" width={32} height={32} />, 
      action: toggleQuickCapture,
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      label: 'Calendario',
      icon: <img src={iconCalendar} alt="Calendario" width={32} height={32} />, 
      action: () => setView('calendario'),
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      label: 'Entrada Agenda',
      icon: <img src={iconCalendar} alt="Entrada Agenda" width={32} height={32} />, 
      action: () => setShowAgendaCapture(true),
      gradient: 'from-violet-400 to-purple-600',
    },
    {
      label: 'Nueva Rutina',
      icon: <img src={iconLayers} alt="Nueva Rutina" width={32} height={32} />, 
      action: () => setShowRoutineBuilder(true),
      gradient: 'from-violet-500 to-purple-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header con reloj */}
      <div
        className={`text-center py-3 rounded-3xl max-w-3xl mx-auto ${
          modoCalma
            ? 'bg-slate-100'
            : 'bg-linear-to-br from-violet-100 via-blue-100 to-purple-100'
        }`}
      >
        <div className="mb-2">
          <img src={iconSparkles} alt="Motivación" className="inline mb-2" width={32} height={32} />
        </div>
        <h1
          className={`text-5xl font-bold mb-2 ${
            modoCalma ? 'text-slate-700' : 'text-slate-800'
          }`}
        >
          {formatTime(currentTime)}
        </h1>
        <p className="text-slate-600 capitalize">{formatDate(currentTime)}</p>

        {/* Mensaje motivacional */}
        <div className="mt-6 mx-auto max-w-md">
          {ideasHoy.length === 0 ? (
            <p className="text-slate-500 italic">
              Día despejado. ¿Qué te gustaría lograr?
            </p>
          ) : ideasHoy.length <= 3 ? (
            <p className="text-green-600 font-medium">
              Tienes {ideasHoy.length} idea{ideasHoy.length > 1 ? 's' : ''} para hoy. ¡Buen ritmo!
            </p>
          ) : (
            <p className="text-amber-600 font-medium">
              {ideasHoy.length} ideas para hoy. Considera usar el Modo Calma.
            </p>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Acciones rápidas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className={`p-6 rounded-2xl text-white text-center
                transition-all duration-300 hover:scale-105 hover:shadow-xl
                ${modoCalma ? 'bg-slate-600' : `bg-linear-to-br ${action.gradient}`}
              `}
            >
              <div className="flex justify-center mb-2">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-2xl ${stat.bg} border border-slate-200`}
          >
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Ideas para hoy (preview) */}
      {ideasHoy.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Para hoy
            </h2>
            <button
              onClick={() => setView('hoy')}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {ideasHoy.slice(0, modoCalma ? 1 : 3).map((idea) => (
              <IdeaCard key={idea.id} idea={idea} compact />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {ideasActivas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Tu mente está despejada
          </h3>
          <p className="text-slate-500 mb-6">
            Empieza capturando tu primera idea
          </p>
          <button
            onClick={() => setShowQuickCapture(true)}
            className={`px-6 py-3 rounded-xl text-white font-medium
              transition-all hover:scale-105
              ${
                modoCalma
                  ? 'bg-slate-700'
                  : 'bg-linear-to-r from-violet-500 to-blue-500'
              }
            `}
          >
            <img src={iconZap} alt="Capturar idea" className="inline mr-2" width={18} height={18} />
            Capturar idea
          </button>
          {showQuickCapture && (
            <QuickCapture onClose={() => setShowQuickCapture(false)} />
          )}
        </div>
      )}
      {showRoutineBuilder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowRoutineBuilder(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <img 
              src={enConstruccion} 
              alt="En construcción" 
              className="w-full mb-6"
            />
            <h2 className="text-2xl font-bold mb-4 text-violet-700 text-center">Función en Desarrollo</h2>
            <p className="text-slate-600 text-center mb-6">
              Estamos trabajando en el módulo de Rutinas. Pronto podrás crear rutinas personalizadas.
            </p>
            <button
              onClick={() => setShowRoutineBuilder(false)}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* AgendaCapture Modal */}
      <AgendaCapture 
        isOpen={showAgendaCapture} 
        onClose={() => setShowAgendaCapture(false)} 
      />
    </div>
  );
}
