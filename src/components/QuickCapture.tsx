          // ...existing code...
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LAYERS, LayerType, IdeaStatus, IdeaType, EnergyBlock } from '../types';
import ZapIcon from '../assets/iconos/Zap.png';
import XIcon from '../assets/iconos/X.png';

// Iconos personalizados

export function QuickCapture({ onClose }: { onClose?: () => void }) {
  const { addIdea, toggleQuickCapture, state } = useApp();
  const { modoCalma } = state.settings;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      toggleQuickCapture();
    }
  };

  const [title, setTitle] = useState('');
  const [layer, setLayer] = useState<LayerType | null>(null);
  const [ideaType, setIdeaType] = useState<IdeaType>('idea');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hora, setHora] = useState('');
  const [energyBlock, setEnergyBlock] = useState<EnergyBlock>('media');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addIdea({
      title: title.trim(),
      description: description.trim() || undefined,
      layer: layer || undefined,
      status: 'semilla' as IdeaStatus,
      type: ideaType,
      energyBlock: energyBlock || undefined,
      date: date || undefined,
      hora: hora || undefined,
      isArchived: false,
      isUrgent: false,
    });

    setTitle('');
    setLayer(null);
    setIdeaType('idea');
    setDescription('');
    setDate('');
    setHora('');
    setEnergyBlock('media');
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[90vh] overflow-y-auto ${
          modoCalma ? 'bg-slate-50' : 'bg-white'
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <img src={ZapIcon} alt="Captura Rápida" width={20} height={20} className="text-amber-500" />
            <h2 className="text-lg font-semibold text-slate-800">
              Captura Rápida
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <img src={XIcon} alt="Cerrar" width={20} height={20} />
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

          {/* Tipo de registro: Idea o Proyecto */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIdeaType('idea')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl
                border-2 transition-all text-sm font-medium
                ${ideaType === 'idea' ? 'border-violet-400 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}
              `}
            >
              <span className="material-symbols-outlined">Idea</span>
              
            </button>
            <button
              type="button"
              onClick={() => setIdeaType('proyecto')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl
                border-2 transition-all text-sm font-medium
                ${ideaType === 'proyecto' ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}
              `}
            >
              <span className="material-symbols-outlined">Proyecto</span>
              
            </button>
          </div>

          {/* Nivel de Energía Necesario */}
          <div>
            <label htmlFor="energyBlock" className="block text-xs text-slate-500 mb-1">
              Nivel de energía necesario
            </label>
            <select
              id="energyBlock"
              value={energyBlock}
              onChange={(e) => setEnergyBlock(e.target.value as EnergyBlock)}
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-violet-400 bg-white text-sm"
            >
              <option value="baja">🔋 Energía Baja</option>
              <option value="media">⚡ Energía Media</option>
              <option value="alta">🔥 Energía Alta</option>
            </select>
          </div>

          {/* Área (Capa) - Opcional con botones */}
          <div>
            <label className="block text-xs text-slate-500 mb-2">
              Área (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLayer(null)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border-2
                  ${
                    layer === null
                      ? 'bg-slate-200 text-slate-700 border-slate-400'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }
                `}
              >
                <span>📭</span>
                Sin área
              </button>
              {Object.values(LAYERS).map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLayer(l.id as LayerType)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border-2
                    ${
                      layer === l.id
                        ? `${l.bgColor} ${l.color} ${l.borderColor}`
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }
                  `}
                >
                  <span>{l.icon}</span>
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fecha y hora opcionales */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="fecha" className="block text-xs text-slate-500 mb-1">Fecha</label>
              <input
                id="fecha"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-violet-400 bg-white text-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="hora" className="block text-xs text-slate-500 mb-1">Hora</label>
              <input
                id="hora"
                type="time"
                value={hora || ''}
                onChange={e => setHora(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-violet-400 bg-white text-sm"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-xs text-slate-500 mb-1">Descripción</label>
            <textarea
              id="descripcion"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="Agrega una descripción (opcional)"
              className="w-full px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-violet-400 bg-white text-sm min-h-15"
            ></textarea>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!title.trim()}
            className={`w-full py-3 rounded-xl text-white font-semibold
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${
                modoCalma
                  ? 'bg-slate-700 hover:bg-slate-800'
                  : 'bg-linear-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600'
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
