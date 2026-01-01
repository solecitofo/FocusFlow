import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IdeaCard } from '../components/IdeaCard';
import {
  getWeekDays,
  getDaysInMonth,
  getDateString,
  isToday,
  getDayName,
  getMonthName,
} from '../utils/dateUtils';

// Iconos personalizados
import iconCalendar from '../assets/iconos/Calendar.png';
import iconList from '../assets/iconos/list.png';
import iconLayers from '../assets/iconos/Layers.png';
import iconArrowLeft from '../assets/iconos/ArrowLeft.png';

type ViewMode = 'semana' | 'mes';

export function CalendarioView() {
  const { state, getIdeasPorFecha } = useApp();
  const { modoCalma } = state.settings;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('semana');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const weekDays = getWeekDays(currentDate);
  const monthDays = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const navigatePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'semana') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'semana') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(getDateString(new Date()));
  };

  const getDayIdeas = (date: Date) => {
    return getIdeasPorFecha(getDateString(date));
  };

  const DayCell = ({ date, size = 'normal' }: { date: Date; size?: 'normal' | 'small' }) => {
    const dateStr = getDateString(date);
    const ideas = getDayIdeas(date);
    const isTodayDate = isToday(date);
    const isSelected = selectedDate === dateStr;
    const hasIdeas = ideas.length > 0;

    return (
      <button
        onClick={() => setSelectedDate(dateStr)}
        className={`relative p-2 rounded-xl transition-all ${
          size === 'small' ? 'min-h-[60px]' : 'min-h-[100px]'
        } ${
          isSelected
            ? modoCalma
              ? 'bg-slate-200 ring-2 ring-slate-400'
              : 'bg-violet-100 ring-2 ring-violet-400'
            : isTodayDate
            ? modoCalma
              ? 'bg-slate-100'
              : 'bg-blue-50'
            : 'bg-white hover:bg-slate-50'
        } border ${hasIdeas ? 'border-violet-200' : 'border-slate-100'}`}
      >
        {/* Fecha */}
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-sm font-medium ${
              isTodayDate ? 'text-violet-600' : 'text-slate-700'
            }`}
          >
            {date.getDate()}
          </span>
          {size === 'normal' && (
            <span className="text-xs text-slate-400 capitalize">
              {getDayName(date).slice(0, 3)}
            </span>
          )}
        </div>

        {/* Indicadores de ideas */}
        {hasIdeas && (
          <div className="mt-1">
            {size === 'normal' ? (
              <div className="space-y-1">
                {ideas.slice(0, 3).map((idea, i) => (
                  <div
                    key={idea.id}
                    className={`text-xs truncate px-1 py-0.5 rounded
                      ${modoCalma ? 'bg-slate-100' : 'bg-violet-100 text-violet-700'}
                    `}
                  >
                    {idea.title}
                  </div>
                ))}
                {ideas.length > 3 && (
                  <span className="text-xs text-slate-400">
                    +{ideas.length - 3} más
                  </span>
                )}
              </div>
            ) : (
              <div className="flex justify-center gap-1">
                {Array.from({ length: Math.min(ideas.length, 3) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        modoCalma ? 'bg-slate-400' : 'bg-violet-400'
                      }`}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Indicador de día despejado */}
        {!hasIdeas && isTodayDate && (
          <div className="text-xs text-green-500 mt-2">despejado</div>
        )}
      </button>
    );
  };

  const selectedIdeas = selectedDate ? getIdeasPorFecha(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <img src={iconCalendar} alt="Calendario" width={28} height={28} className={modoCalma ? 'opacity-60' : 'text-violet-500'} />
            Calendario
          </h1>
          <p className="text-slate-500 capitalize">
            {getMonthName(currentDate)} {currentDate.getFullYear()}
          </p>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2">
          {/* Toggle vista */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('semana')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'semana'
                  ? 'bg-white shadow-sm text-violet-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <img src={iconList} alt="Semana" width={18} height={18} />
            </button>
            <button
              onClick={() => setViewMode('mes')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'mes'
                  ? 'bg-white shadow-sm text-violet-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <img src={iconLayers} alt="Mes" width={18} height={18} />
            </button>
          </div>

          {/* Navegación */}
          <button
            onClick={navigatePrev}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <img src={iconArrowLeft} alt="Anterior" width={20} height={20} />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm font-medium text-violet-600 hover:bg-violet-50 rounded-lg"
          >
            Hoy
          </button>
          <button
            onClick={navigateNext}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <img src={iconArrowLeft} alt="Siguiente" width={20} height={20} className="rotate-180" />
          </button>
        </div>
      </div>

      {/* Vista de semana */}
      {viewMode === 'semana' && (
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <DayCell key={getDateString(day)} date={day} size="normal" />
          ))}
        </div>
      )}

      {/* Vista de mes */}
      {viewMode === 'mes' && (
        <div>
          {/* Headers de días */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-slate-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-2">
            {/* Espacios vacíos para alinear con el día de la semana */}
            {Array.from({
              length: (monthDays[0].getDay() + 6) % 7,
            }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {monthDays.map((day) => (
              <DayCell key={getDateString(day)} date={day} size="small" />
            ))}
          </div>
        </div>
      )}

      {/* Panel de ideas del día seleccionado */}
      {selectedDate && (
        <div
          className={`p-6 rounded-2xl ${
            modoCalma ? 'bg-slate-100' : 'bg-gradient-to-br from-violet-50 to-blue-50'
          }`}
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Ideas para el{' '}
            {new Date(selectedDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </h2>

          {selectedIdeas.length > 0 ? (
            <div className="space-y-3">
              {selectedIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} compact={modoCalma} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">
              No hay ideas para este día. ¡Día despejado!
            </p>
          )}
        </div>
      )}

      {/* Leyenda de indicadores */}
      <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-400" />
          <span>Día con ideas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200" />
          <span>Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100" />
          <span>Despejado</span>
        </div>
      </div>
    </div>
  );
}
