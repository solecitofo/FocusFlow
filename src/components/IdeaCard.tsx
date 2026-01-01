import React from 'react';
import { useApp } from '../context/AppContext';
import { Idea, LAYERS, STATUS_CONFIG } from '../types';
import { getRelativeTimeString } from '../utils/dateUtils';

// Iconos personalizados

interface IdeaCardProps {
  idea: Idea;
  compact?: boolean;
  showActions?: boolean;
  onClick?: () => void;
}

export function IdeaCard({
  idea,
  compact = false,
  showActions = true,
  onClick,
}: IdeaCardProps) {
  const { completeIdea, archiveIdea, deleteIdea, selectIdea, state } = useApp();
  const { modoCalma } = state.settings;

  const layer = idea.layer ? LAYERS[idea.layer] : null;
  const status = STATUS_CONFIG[idea.status];
  const isCompleted = !!idea.completedAt;

  // Emoji para energía
  const energyEmoji = {
    baja: '🔋',
    media: '⚡',
    alta: '🔥',
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    completeIdea(idea.id);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    archiveIdea(idea.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar esta idea?')) {
      deleteIdea(idea.id);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      selectIdea(idea.id);
    }
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer
          transition-all duration-200 hover:shadow-md
          ${isCompleted ? 'opacity-60' : ''}
          ${
            modoCalma
              ? 'bg-white hover:bg-slate-50'
              : layer
                ? `${layer.bgColor} hover:shadow-lg`
                : 'bg-slate-50 hover:bg-slate-100'
          }
          ${layer ? `border ${layer.borderColor}` : 'border border-slate-200'}
        `}
      >
        {/* Checkbox */}
        <button
          onClick={handleComplete}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2
            flex items-center justify-center transition-all
            ${
              isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : `border-slate-300 hover:border-green-400 hover:bg-green-50`
            }
          `}
        >
          {isCompleted && <img src={require('../assets/iconos/Check.png')} alt="Completada" width={14} height={14} />}
        </button>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {idea.title}
          </p>
        </div>

        {/* Indicadores */}
        <div className="flex items-center gap-1.5">
          {idea.isUrgent && (
            <img src={require('../assets/iconos/AlertCircle.png')} alt="Urgente" width={14} height={14} className="text-red-500" />
          )}
          {idea.energyBlock && (
            <span className="text-xs">
              {energyEmoji[idea.energyBlock]}
            </span>
          )}
          {layer && (
            <span className="text-sm">
              {layer.icon && typeof layer.icon === 'string' ? (
                <img src={require(`../assets/iconos/${layer.icon}.png`)} alt={layer.name} width={16} height={16} />
              ) : (
                layer.icon
              )}
            </span>
          )}
          <span className="text-xs">{status.emoji}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative p-4 rounded-2xl cursor-pointer
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${isCompleted ? 'opacity-70' : ''}
        ${
          modoCalma
            ? 'bg-white border border-slate-200'
            : layer
              ? `${layer.bgColor} border-2 ${layer.borderColor}`
              : 'bg-slate-50 border-2 border-slate-200'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {/* Checkbox */}
          <button
            onClick={handleComplete}
            className={`flex-shrink-0 w-7 h-7 rounded-full border-2
              flex items-center justify-center transition-all
              ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : `border-slate-300 hover:border-green-400 hover:bg-green-50`
              }
            `}
          >
            {isCompleted && <img src={require('../assets/iconos/Check.png')} alt="Completada" width={16} height={16} />}
          </button>

          {/* Capa badge */}
          {layer && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium
                ${layer.bgColor} ${layer.color}
              `}
            >
              {layer.icon && typeof layer.icon === 'string' ? (
                <img src={require(`../assets/iconos/${layer.icon}.png`)} alt={layer.name} width={16} height={16} />
              ) : (
                layer.icon
              )}{' '}
              {layer.name}
            </span>
          )}
          {!layer && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-200 text-slate-600">
              📁 Sin área
            </span>
          )}
        </div>

        {/* Tipo de idea y Energía */}
        <div className="flex items-center gap-2">
          {idea.energyBlock && (
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium
                ${
                  idea.energyBlock === 'alta'
                    ? 'bg-red-100 text-red-600'
                    : idea.energyBlock === 'media'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-blue-100 text-blue-600'
                }
              `}
            >
              {energyEmoji[idea.energyBlock]} {idea.energyBlock}
            </div>
          )}
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs
              ${
                idea.type === 'proyecto'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-violet-100 text-violet-600'
              }
            `}
          >
            {idea.type === 'proyecto' ? (
              <img src={require('../assets/iconos/Folder.png')} alt="Proyecto" width={12} height={12} />
            ) : (
              <img src={require('../assets/iconos/Sparkles.png')} alt="Idea" width={12} height={12} />
            )}
            {idea.type === 'proyecto' ? 'Proyecto' : 'Idea'}
          </div>
        </div>
      </div>

      {/* Título */}
      <h3
        className={`text-lg font-semibold mb-1 ${
          isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
        }`}
      >
        {idea.title}
      </h3>

      {/* Descripción */}
      {idea.description && (
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {idea.description}
        </p>
      )}

      {/* Metadata (fecha, hora) */}
      {(idea.date || idea.hora) && (
        <div className="mb-3 flex flex-wrap gap-2">
          {idea.date && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              📅 {new Date(idea.date).toLocaleDateString('es-ES')}
            </span>
          )}
          {idea.hora && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              🕐 {idea.hora}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        {/* Estado y tiempo */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${status.color}`}
          >
            {status.emoji} {status.name}
          </span>
          <span className="text-xs text-slate-400">
            {getRelativeTimeString(idea.createdAt)}
          </span>
        </div>

        {/* Acciones */}
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleArchive}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600"
              title={idea.isArchived ? 'Desarchivar' : 'Archivar'}
            >
              <img src={require('../assets/iconos/Archive.png')} alt="Archivar" width={16} height={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600"
              title="Eliminar"
            >
              <img src={require('../assets/iconos/Trash2.png')} alt="Eliminar" width={16} height={16} />
            </button>
          </div>
        )}
      </div>

      {/* Indicador de urgente */}
      {idea.isUrgent && (
        <div className="absolute top-2 right-2">
          <img src={require('../assets/iconos/AlertCircle.png')} alt="Urgente" width={18} height={18} className="text-red-500" />
        </div>
      )}
    </div>
  );
}
