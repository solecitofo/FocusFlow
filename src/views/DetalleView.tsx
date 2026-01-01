import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  LAYERS,
  STATUS_CONFIG,
  ENERGY_BLOCKS,
  LayerType,
  IdeaStatus,
  EnergyBlock,
  IdeaType,
} from '../types';
import { formatDate, getRelativeTimeString } from '../utils/dateUtils';

// Iconos personalizados

export function DetalleView() {
  const { state, setView, getSelectedIdea, updateIdea, deleteIdea, archiveIdea, completeIdea } =
    useApp();
  const { modoCalma } = state.settings;

  const idea = getSelectedIdea();
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [layer, setLayer] = useState<LayerType>('personal');
  const [status, setStatus] = useState<IdeaStatus>('semilla');
  const [ideaType, setIdeaType] = useState<IdeaType>('rapida');
  const [energyBlock, setEnergyBlock] = useState<EnergyBlock | undefined>();
  const [date, setDate] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (idea) {
      setTitle(idea.title);
      setDescription(idea.description || '');
      setLayer(idea.layer);
      setStatus(idea.status);
      setIdeaType(idea.type);
      setEnergyBlock(idea.energyBlock);
      setDate(idea.date || '');
      setIsUrgent(idea.isUrgent);
    }
  }, [idea]);

  if (!idea) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Idea no encontrada</p>
        <button
          onClick={() => setView('home')}
          className="mt-4 text-violet-600 hover:text-violet-700"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const layerConfig = LAYERS[idea.layer];
  const statusConfig = STATUS_CONFIG[idea.status];
  const isCompleted = !!idea.completedAt;

  const handleSave = () => {
    updateIdea({
      id: idea.id,
      title,
      description: description || undefined,
      layer,
      status,
      type: ideaType,
      energyBlock,
      date: date || undefined,
      isUrgent,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('¿Eliminar esta idea permanentemente?')) {
      deleteIdea(idea.id);
      setView('home');
    }
  };

  const handleComplete = () => {
    completeIdea(idea.id);
  };

  const handleArchive = () => {
    archiveIdea(idea.id);
    setView('espacios');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
        >
          <img src={require('../assets/iconos/ArrowLeft.png')} alt="Volver" width={20} height={20} />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                title="Editar"
              >
                <img src={require('../assets/iconos/Edit3.png')} alt="Editar" width={20} height={20} />
              </button>
              <button
                onClick={handleArchive}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                title={idea.isArchived ? 'Desarchivar' : 'Archivar'}
              >
                <img src={require('../assets/iconos/Archive.png')} alt="Archivar" width={20} height={20} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                title="Eliminar"
              >
                <img src={require('../assets/iconos/Trash2.png')} alt="Eliminar" width={20} height={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg
                  hover:bg-green-600"
              >
                <img src={require('../assets/iconos/Check.png')} alt="Guardar" width={18} height={18} />
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              >
                <img src={require('../assets/iconos/X.png')} alt="Cancelar" width={20} height={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div
        className={`p-6 rounded-2xl ${
          modoCalma
            ? 'bg-white border border-slate-200'
            : `${layerConfig.bgColor} border-2 ${layerConfig.borderColor}`
        }`}
      >
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Capa */}
          {isEditing ? (
            <div className="flex flex-wrap gap-1">
              {Object.values(LAYERS).map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLayer(l.id as LayerType)}
                  className={`px-2 py-1 rounded-lg text-sm border-2 transition-all
                    ${
                      layer === l.id
                        ? `${l.bgColor} ${l.color} ${l.borderColor}`
                        : 'border-slate-200 text-slate-500'
                    }
                  `}
                >
                  {l.icon && typeof l.icon === 'string' ? (
                    <img src={require(`../assets/iconos/${l.icon}.png`)} alt={l.name} width={16} height={16} />
                  ) : l.icon} {l.name}
                </button>
              ))}
            </div>
          ) : (
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium
                ${layerConfig.bgColor} ${layerConfig.color}
              `}
            >
              {layerConfig.icon && typeof layerConfig.icon === 'string' ? (
                <img src={require(`../assets/iconos/${layerConfig.icon}.png`)} alt={layerConfig.name} width={16} height={16} />
              ) : layerConfig.icon} {layerConfig.name}
            </span>
          )}

          {/* Tipo */}
          {isEditing ? (
            <div className="flex gap-1">
              <button
                onClick={() => setIdeaType('rapida')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm border-2
                  ${
                    ideaType === 'rapida'
                      ? 'border-blue-400 bg-blue-50 text-blue-600'
                      : 'border-slate-200 text-slate-500'
                  }
                `}
              >
                <img src={require('../assets/iconos/Zap.png')} alt="Rápida" width={14} height={14} /> Rápida
              </button>
              <button
                onClick={() => setIdeaType('todo_el_dia')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm border-2
                  ${
                    ideaType === 'todo_el_dia'
                      ? 'border-violet-400 bg-violet-50 text-violet-600'
                      : 'border-slate-200 text-slate-500'
                  }
                `}
              >
                <img src={require('../assets/iconos/Clock.png')} alt="Todo el día" width={14} height={14} /> Todo el día
              </button>
            </div>
          ) : (
            <span
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm
                ${
                  idea.type === 'rapida'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-violet-100 text-violet-600'
                }
              `}
            >
              {idea.type === 'rapida' ? (
                <img src={require('../assets/iconos/Zap.png')} alt="Rápida" width={14} height={14} />
              ) : (
                <img src={require('../assets/iconos/Clock.png')} alt="Todo el día" width={14} height={14} />
              )}
              {idea.type === 'rapida' ? 'Rápida' : 'Todo el día'}
            </span>
          )}

          {/* Urgente */}
          {isEditing ? (
            <button
              onClick={() => setIsUrgent(!isUrgent)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm border-2
                ${
                  isUrgent
                    ? 'border-red-400 bg-red-50 text-red-600'
                    : 'border-slate-200 text-slate-500'
                }
              `}
            >
              <img src={require('../assets/iconos/AlertCircle.png')} alt="Urgente" width={14} height={14} />
              {isUrgent ? 'Urgente' : 'Marcar urgente'}
            </button>
          ) : (
            idea.isUrgent && (
              <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm">
                <img src={require('../assets/iconos/AlertCircle.png')} alt="Urgente" width={14} height={14} /> Urgente
              </span>
            )
          )}
        </div>

        {/* Título */}
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold text-slate-800 bg-transparent
              border-b-2 border-slate-300 focus:border-violet-400 focus:outline-none
              pb-2 mb-4"
            placeholder="Título de la idea"
          />
        ) : (
          <h1
            className={`text-2xl font-bold mb-4 ${
              isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {idea.title}
          </h1>
        )}

        {/* Descripción */}
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border-2 border-slate-200
              focus:border-violet-400 focus:outline-none resize-none mb-4"
            placeholder="Añade una descripción..."
          />
        ) : (
          idea.description && (
            <p className="text-slate-600 mb-4">{idea.description}</p>
          )
        )}

        {/* Estado */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600 mb-2 block">
            Estado
          </label>
          {isEditing ? (
            <div className="flex gap-2">
              {Object.values(STATUS_CONFIG).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatus(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all
                    ${
                      status === s.id
                        ? `${s.color} bg-white border-current`
                        : 'border-slate-200 text-slate-500'
                    }
                  `}
                >
                  <span>{s.emoji}</span>
                  <span className="text-sm font-medium">{s.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className={`flex items-center gap-2 ${statusConfig.color}`}>
              <span className="text-xl">{statusConfig.emoji}</span>
              <span className="font-medium">{statusConfig.name}</span>
              <span className="text-sm text-slate-400">
                - {statusConfig.description}
              </span>
            </div>
          )}
        </div>

        {/* Bloque de energía */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600 mb-2 block flex items-center gap-2">
            <img src={require('../assets/iconos/Zap.png')} alt="Bloque de energía" width={16} height={16} />
            Bloque de energía
          </label>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setEnergyBlock(undefined)}
                className={`px-3 py-2 rounded-xl border-2 text-sm
                  ${
                    !energyBlock
                      ? 'border-slate-400 bg-slate-100'
                      : 'border-slate-200 text-slate-500'
                  }
                `}
              >
                Sin asignar
              </button>
              {Object.values(ENERGY_BLOCKS).map((block) => (
                <button
                  key={block.id}
                  onClick={() => setEnergyBlock(block.id)}
                  className={`px-3 py-2 rounded-xl border-2 text-sm transition-all
                    ${
                      energyBlock === block.id
                        ? `${block.color} border-current`
                        : 'border-slate-200 text-slate-500'
                    }
                  `}
                >
                  {block.name}
                </button>
              ))}
            </div>
          ) : (
            <div
              className={`px-3 py-2 rounded-xl inline-block ${
                energyBlock
                  ? ENERGY_BLOCKS[energyBlock].color
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {energyBlock
                ? `${ENERGY_BLOCKS[energyBlock].name} (${ENERGY_BLOCKS[energyBlock].timeRange})`
                : 'Sin bloque asignado'}
            </div>
          )}
        </div>

        {/* Fecha */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600 mb-2 block flex items-center gap-2">
            <img src={require('../assets/iconos/Calendar.png')} alt="Fecha asignada" width={16} height={16} />
            Fecha asignada
          </label>
          {isEditing ? (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-xl border-2 border-slate-200
                focus:border-violet-400 focus:outline-none"
            />
          ) : (
            <div className="text-slate-600">
              {idea.date
                ? formatDate(new Date(idea.date))
                : 'Sin fecha asignada'}
            </div>
          )}
        </div>

        {/* Metadatos */}
        <div className="pt-4 border-t border-slate-200 text-sm text-slate-500">
          <div className="flex justify-between">
            <span>Creada {getRelativeTimeString(idea.createdAt)}</span>
            <span>Actualizada {getRelativeTimeString(idea.updatedAt)}</span>
          </div>
          {idea.completedAt && (
            <div className="mt-2 text-green-600">
              Completada {getRelativeTimeString(idea.completedAt)}
            </div>
          )}
        </div>
      </div>

      {/* Botón de completar */}
      {!isEditing && !isCompleted && (
        <button
          onClick={handleComplete}
          className={`w-full py-4 rounded-2xl text-white font-semibold text-lg
            flex items-center justify-center gap-3 transition-all
            hover:scale-[1.02] hover:shadow-lg
            ${
              modoCalma
                ? 'bg-slate-700'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }
          `}
        >
          <img src={require('../assets/iconos/Check.png')} alt="Completada" width={24} height={24} />
          Marcar como completada
        </button>
      )}

      {isCompleted && (
        <div className="text-center py-6 bg-green-50 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-semibold text-green-700">
            ¡Idea completada!
          </h3>
          <button
            onClick={handleComplete}
            className="mt-3 text-sm text-green-600 hover:text-green-700"
          >
            Desmarcar como completada
          </button>
        </div>
      )}
    </div>
  );
}
