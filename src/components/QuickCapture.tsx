import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LAYERS, LayerType, IdeaStatus, IdeaType } from '../types';
import XIcon from '../assets/iconos/X.png';
import ZapIcon from '../assets/iconos/Zap.png';
import ClockIcon from '../assets/iconos/Clock.png';

export function QuickCapture() {
  const { addIdea, toggleQuickCapture, state } = useApp();
  const { modoCalma } = state.settings;
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [layer, setLayer] = useState<LayerType>('personal');
  const [ideaType, setIdeaType] = useState<IdeaType>('rapida');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addIdea({
      title: title.trim(),
      description: description.trim() || undefined,
      layer,
      status: 'semilla' as IdeaStatus,
      type: ideaType,
      date: date || undefined,
      isArchived: false,
      isUrgent: false,
    });

    setTitle('');
    setDescription('');
    setDate('');
    toggleQuickCapture();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleQuickCapture();
    }
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={toggleQuickCapture}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 ${
          modoCalma ? 'bg-slate-50' : 'bg-white'
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <img src={ZapIcon} alt="Rayo" className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-slate-800">
              Captura Rápida
            </h2>
          </div>
          <button
            onClick={toggleQuickCapture}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <img src={XIcon} alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Input principal */}
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué tienes en mente?"
            className={`w-full px-4 py-3 text-lg rounded-xl border-2 transition-all
              focus:outline-none focus:ring-0
              ${
                modoCalma
                  ? 'border-slate-200 focus:border-slate-400 bg-white'
                  : 'border-slate-200 focus:border-violet-400 bg-white'
              }
            `}
            autoComplete="off"
          />

          {/* Tipo de idea */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIdeaType('rapida')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl
                border-2 transition-all text-sm font-medium
                ${
                  ideaType === 'rapida'
                    ? 'border-blue-400 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }
              `}
            >
              <img src={ZapIcon} alt="Rápida" className="w-4 h-4" />
              Rápida
            </button>
            <button
              type="button"
              onClick={() => setIdeaType('todo_el_dia')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl
                border-2 transition-all text-sm font-medium
                ${
                  ideaType === 'todo_el_dia'
                    ? 'border-violet-400 bg-violet-50 text-violet-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }
              `}
            >
              <img src={ClockIcon} alt="Todo el día" className="w-4 h-4" />
              Todo el día
            </button>
          </div>

          {/* Selector de capa */}
          <div className="flex flex-wrap gap-2">
            {Object.values(LAYERS).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLayer(l.id as LayerType)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                  border-2 transition-all font-medium
                  ${
                    layer === l.id
                      ? `${l.bgColor} ${l.borderColor} ${l.color}`
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }
                `}
              >
                <span>{l.icon}</span>
                <span>{l.name}</span>
              </button>
            ))}
          </div>

          {/* Toggle opciones avanzadas */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            {showAdvanced ? '- Menos opciones' : '+ Más opciones'}
          </button>

          {/* Opciones avanzadas */}
          {showAdvanced && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Añade una descripción (opcional)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200
                  focus:border-violet-400 focus:outline-none resize-none"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 border-slate-200
                  focus:border-violet-400 focus:outline-none"
              />
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!title.trim()}
            className={`w-full py-3 rounded-xl text-white font-semibold
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${
                modoCalma
                  ? 'bg-slate-700 hover:bg-slate-800'
                  : 'bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600'
              }
            `}
          >
            Capturar idea
          </button>

          {/* Hint */}
          <p className="text-xs text-center text-slate-400">
            Presiona <kbd className="px-1 py-0.5 bg-slate-100 rounded">Esc</kbd>{' '}
            para cerrar o{' '}
            <kbd className="px-1 py-0.5 bg-slate-100 rounded">Cmd+Enter</kbd> para
            guardar
          </p>
        </form>
      </div>
    </div>
  );
}
