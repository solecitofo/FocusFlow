import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, formatTime } from '../utils/dateUtils';
import { IdeaCard } from '../components/IdeaCard';

// Custom icons
import ClockIcon from '../assets/iconos/Clock.png';
import CalendarIcon from '../assets/iconos/Calendar.png';
import LayersIcon from '../assets/iconos/Layers.png';
import ZapIcon from '../assets/iconos/Zap.png';
import TrendingUpIcon from '../assets/iconos/TrendingUp.png';
import SparklesIcon from '../assets/iconos/Sparkles.png';

export function HomeView() {
  const { state, setView, getIdeasHoy, getIdeasActivas, toggleQuickCapture } = useApp();
  const { modoCalma } = state.settings;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const ideasHoy = getIdeasHoy();
  const ideasActivas = getIdeasActivas();
  const urgentes = ideasActivas.filter((i) => i.isUrgent);

  const stats = [
    {
      label: 'Ideas activas',
      value: ideasActivas.length,
      icon: <img src={TrendingUpIcon} alt="Tendencia" className="w-5 h-5" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Para hoy',
      value: ideasHoy.length,
      icon: <img src={ClockIcon} alt="Reloj" className="w-5 h-5" />,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Urgentes',
      value: urgentes.length,
      icon: <img src={ZapIcon} alt="Urgente" className="w-5 h-5" />,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  const quickActions = [
    {
      label: 'Captura rápida',
      icon: <img src={ZapIcon} alt="Captura" className="w-6 h-6" />,
      action: toggleQuickCapture,
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      label: 'Ver Hoy',
      icon: <img src={ClockIcon} alt="Hoy" className="w-6 h-6" />,
      action: () => setView('hoy'),
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      label: 'Calendario',
      icon: <img src={CalendarIcon} alt="Calendario" className="w-6 h-6" />,
      action: () => setView('calendario'),
      gradient: 'from-violet-400 to-purple-600',
    },
    {
      label: 'Espacios',
      icon: <img src={LayersIcon} alt="Espacios" className="w-6 h-6" />,
      action: () => setView('espacios'),
      gradient: 'from-teal-400 to-cyan-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header con reloj */}
      <div
        className={`text-center py-8 rounded-3xl ${
          modoCalma
            ? 'bg-slate-100'
            : 'bg-gradient-to-br from-violet-100 via-blue-100 to-purple-100'
        }`}
      >
        <div className="mb-2">
          <img src={SparklesIcon} alt="Sparkles" className="inline w-6 h-6 mb-2" />
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

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4">
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
                ${modoCalma ? 'bg-slate-600' : `bg-gradient-to-br ${action.gradient}`}
              `}
            >
              <div className="flex justify-center mb-2">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
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
            onClick={toggleQuickCapture}
            className={`px-6 py-3 rounded-xl text-white font-medium
              transition-all hover:scale-105
              ${
                modoCalma
                  ? 'bg-slate-700'
                  : 'bg-gradient-to-r from-violet-500 to-blue-500'
              }
            `}
          >
            <img src={ZapIcon} alt="Capturar" className="inline w-4 h-4 mr-2" />
            Capturar idea
          </button>
        </div>
      )}
    </div>
  );
}
