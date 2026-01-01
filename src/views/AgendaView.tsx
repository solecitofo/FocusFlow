import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import { EventoAgenda, NivelAnsiedad, NivelPrioridad } from '../types';
import { AgendaCapture } from '../components/AgendaCapture';

// Iconos
import CalendarIcon from '../assets/iconos/Calendar.png';
import ClockIcon from '../assets/iconos/Clock.png';

const tipoEmoji: Record<string, string> = {
  evento: '📅',
  recordatorio: '🔔',
  cumpleanos: '🎂',
  obligacion: '✅',
};

const ansiedadEmoji: Record<NivelAnsiedad, string> = {
  bajo: '😊',
  medio: '😐',
  alto: '😰',
};

const prioridadEmoji: Record<NivelPrioridad, string> = {
  baja: '📋',
  normal: '⭐',
  alta: '🔴',
  urgente: '🚨',
};

const prioridadColor: Record<NivelPrioridad, string> = {
  baja: 'border-slate-200 bg-slate-50',
  normal: 'border-blue-200 bg-blue-50',
  alta: 'border-orange-200 bg-orange-50',
  urgente: 'border-red-200 bg-red-50',
};

export function AgendaView() {
  const { state, deleteEvento, completeEvento, setView } = useApp();
  const { modoCalma } = state.settings;
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);
  const [ordenarPor, setOrdenarPor] = useState<'fecha' | 'prioridad' | 'ansiedad'>('fecha');
  const [showAgendaCapture, setShowAgendaCapture] = useState(false);

  // Filtrar y ordenar eventos
  const eventosFiltrados = useMemo(() => {
    let eventos = [...state.eventos];

    // Aplicar filtros
    if (filtroTipo) {
      eventos = eventos.filter((e) => e.tipo === filtroTipo);
    }

    // Ordenar
    eventos.sort((a, b) => {
      if (ordenarPor === 'fecha') {
        return a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora);
      } else if (ordenarPor === 'prioridad') {
        const prioridades = { baja: 0, normal: 1, alta: 2, urgente: 3 };
        return (prioridades[b.nivelPrioridad] || 0) - (prioridades[a.nivelPrioridad] || 0);
      } else if (ordenarPor === 'ansiedad') {
        const ansiedad = { bajo: 0, medio: 1, alto: 2 };
        return (ansiedad[b.nivelAnsiedad] || 0) - (ansiedad[a.nivelAnsiedad] || 0);
      }
      return 0;
    });

    return eventos;
  }, [state.eventos, filtroTipo, ordenarPor]);

  const eventosNoCompletados = eventosFiltrados.filter((e) => !e.completado);
  const eventosCompletados = eventosFiltrados.filter((e) => e.completado);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'evento':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'recordatorio':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'cumpleanos':
        return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'obligacion':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`rounded-3xl p-6 ${
          modoCalma ? 'bg-slate-100' : 'bg-linear-to-br from-blue-100 to-cyan-100'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <img src={CalendarIcon} alt="Agenda" width={24} height={24} />
          <h1 className="text-3xl font-bold text-slate-800">Mi Agenda</h1>
        </div>
        <p className="text-slate-600">
          {eventosFiltrados.length} evento{eventosFiltrados.length !== 1 ? 's' : ''} •{' '}
          {eventosNoCompletados.length} pendiente{eventosNoCompletados.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Controles de filtro y orden */}
      <div className="flex flex-wrap gap-3">
        {/* Filtro por tipo */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFiltroTipo(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${
                filtroTipo === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            Todos
          </button>
          {['evento', 'recordatorio', 'cumpleanos', 'obligacion'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${
                  filtroTipo === tipo
                    ? getTipoColor(tipo)
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }
              `}
            >
              {tipoEmoji[tipo]} {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </button>
          ))}
        </div>

        {/* Orden */}
        <select
          value={ordenarPor}
          onChange={(e) => setOrdenarPor(e.target.value as any)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-200 text-slate-700 hover:bg-slate-300"
          title="Ordenar eventos por"
        >
          <option value="fecha">📅 Ordenar por fecha</option>
          <option value="prioridad">🔴 Ordenar por prioridad</option>
          <option value="ansiedad">😰 Ordenar por ansiedad</option>
        </select>
      </div>

      {/* Eventos pendientes */}
      {eventosNoCompletados.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-800">Pendientes</h2>
          <div className="grid gap-3">
            {eventosNoCompletados.map((evento) => (
              <EventoCard
                key={evento.id}
                evento={evento}
                onComplete={() => completeEvento(evento.id)}
                onDelete={() => deleteEvento(evento.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Eventos completados */}
      {eventosCompletados.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-700">Completados</h2>
          <div className="grid gap-3 opacity-60">
            {eventosCompletados.map((evento) => (
              <EventoCard
                key={evento.id}
                evento={evento}
                onComplete={() => completeEvento(evento.id)}
                onDelete={() => deleteEvento(evento.id)}
                completed
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {eventosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Agenda vacía
          </h3>
          <p className="text-slate-500 mb-6">
            No hay eventos agendados con estos filtros
          </p>
          <button
            onClick={() => setShowAgendaCapture(true)}
            className={`px-6 py-3 rounded-xl text-white font-medium
              transition-all hover:scale-105
              ${
                modoCalma
                  ? 'bg-slate-700'
                  : 'bg-linear-to-r from-blue-500 to-cyan-500'
              }
            `}
          >
            <img src={CalendarIcon} alt="Agendar" className="inline mr-2" width={18} height={18} />
            Agendar evento
          </button>
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

// Componente para tarjeta de evento
function EventoCard({
  evento,
  onComplete,
  onDelete,
  completed = false,
}: {
  evento: EventoAgenda;
  onComplete: () => void;
  onDelete: () => void;
  completed?: boolean;
}) {
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'evento':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'recordatorio':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'cumpleanos':
        return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'obligacion':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };
  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all ${
        completed
          ? 'border-slate-200 bg-slate-50 line-through'
          : prioridadColor[evento.nivelPrioridad]
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          {/* Título con tipo y ansiedad */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl">{tipoEmoji[evento.tipo]}</span>
            <span className="text-2xl">{ansiedadEmoji[evento.nivelAnsiedad]}</span>
            <span className="text-2xl">{prioridadEmoji[evento.nivelPrioridad]}</span>
            <h3
              className={`text-lg font-bold ${
                completed
                  ? 'text-slate-500'
                  : 'text-slate-800'
              }`}
            >
              {evento.titulo}
            </h3>
          </div>

          {/* Descripción */}
          {evento.descripcion && (
            <p className={`text-sm ${completed ? 'text-slate-400' : 'text-slate-600'}`}>
              {evento.descripcion}
            </p>
          )}

          {/* Fecha y hora */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1 text-slate-600">
              <span>📅</span>
              {formatDate(new Date(evento.fecha + 'T00:00:00'))}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <img src={ClockIcon} alt="Hora" width={16} height={16} />
              {evento.hora}
            </div>
            {evento.tieneRecordatorio && evento.recordatoriosPersonalizados && evento.recordatoriosPersonalizados.length > 0 && (
              <div className="flex items-center gap-1 text-blue-600 flex-wrap">
                <span>🔔</span>
                <span>Recordatorios:</span>
                {evento.recordatoriosPersonalizados.map((rec, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {rec.horas}h {rec.minutos > 0 ? `${rec.minutos}min` : ''}
                  </span>
                ))}
              </div>
            )}
            {evento.frecuenciaRepeticion !== 'no_repite' && (
              <div className="flex items-center gap-1 text-purple-600">
                <span>🔄</span>
                {evento.frecuenciaRepeticion}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getTipoColor(evento.tipo)}`}>
              {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium 
              ${
                evento.nivelAnsiedad === 'bajo'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : evento.nivelAnsiedad === 'medio'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }
            `}>
              Ansiedad: {evento.nivelAnsiedad}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${prioridadColor[evento.nivelPrioridad]}`}>
              Prioridad: {evento.nivelPrioridad}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={onComplete}
            className={`p-2 rounded-lg transition-all ${
              completed
                ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            title={completed ? 'Marcar como pendiente' : 'Marcar como completado'}
          >
            {completed ? '↩️' : '✅'}
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
            title="Eliminar evento"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
