import React from 'react';
import { useApp } from '../context/AppContext';
import { Idea, LAYERS, STATUS_CONFIG } from '../types';
import { getRelativeTimeString } from '../utils/dateUtils';
import {
  Check,
  Trash2,
} 
from 'lucide-react';

import CheckIcon from '../assets/iconos/Check.png';
import ArchiveIcon from '../assets/iconos/Archive.png';
import ZapIcon from '../assets/iconos/Zap.png';
import ClockIcon from '../assets/iconos/Clock.png';
import AlertCircleIcon from '../assets/iconos/AlertCircle.png';

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

  const layer = LAYERS[idea.layer];
  const status = STATUS_CONFIG[idea.status];
  const isCompleted = !!idea.completedAt;

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
          ${modoCalma ? 'bg-white hover:bg-slate-50' : `${layer.bgColor} hover:shadow-lg`}
          border ${layer.borderColor}
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
          {isCompleted && <img src={CheckIcon} alt="Completado" className="w-3.5 h-3.5" />}
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
            <img src={AlertCircleIcon} alt="Urgente" className="w-3.5 h-3.5 text-red-500" />
          )}
          <span className="text-sm">{layer.icon}</span>
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
            : `${layer.bgColor} border-2 ${layer.borderColor}`
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
            {isCompleted && <Check size={16} />}
          </button>

          {/* Capa badge */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium
              ${layer.bgColor} ${layer.color}
            `}
          >
            {layer.icon} {layer.name}
          </span>
        </div>

        {/* Tipo de idea */}
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs
            ${idea.type === 'rapida' ? 'bg-blue-100 text-blue-600' : 'bg-violet-100 text-violet-600'}
          `}
        >
          {idea.type === 'rapida' ? <img src={ZapIcon} alt="Rápida" className="w-3 h-3" /> : <img src={ClockIcon} alt="Todo el día" className="w-3 h-3" />}
          {idea.type === 'rapida' ? 'Rápida' : 'Todo el día'}
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
              <img src={ArchiveIcon} alt="Archivar" className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Indicador de urgente */}
      {idea.isUrgent && (
        <div className="absolute top-2 right-2">
          <img src={AlertCircleIcon} alt="Urgente" className="w-4.5 h-4.5 text-red-500" />
        </div>
      )}
    </div>
  );
}
