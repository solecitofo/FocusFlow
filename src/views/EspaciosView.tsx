import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IdeaCard } from '../components/IdeaCard';
import { MentalSpace, LAYERS, LayerType } from '../types';

import iconCheckCircle from '../assets/iconos/CheckCircle.png';
import iconFolder from '../assets/iconos/Folder.png';

import iconLayers from '../assets/iconos/Layers.png';


// Iconos personalizados (importación estática para Vite/React)
import iconSparkles from '../assets/iconos/Sparkles.png';
import iconClock from '../assets/iconos/Clock.png';
import iconArchive from '../assets/iconos/Archive.png';

export function EspaciosView() {
  const {
    state,
    getIdeasActivas,
    getIdeasRecientes,
    getIdeasArchivadas,
    getIdeasPorCapa,
    setEspacioActivo,
  } = useApp();
  const { modoCalma, espacioActivo } = state.settings;

  const [selectedCapa, setSelectedCapa] = useState<LayerType | null>(null);

  const ideasActivas = getIdeasActivas();
  const ideasRecientes = getIdeasRecientes();
  const ideasArchivadas = getIdeasArchivadas();
  const completadas = state.ideas.filter((i) => i.completedAt && !i.isArchived);

  const espacios: {
    id: MentalSpace;
    label: string;
    icon: React.ReactNode;
    count: number;
    color: string;
  }[] = [
    {
      id: 'activas',
      label: 'Activas',
      icon: <img src={iconSparkles} alt="Activas" width={20} height={20} />, 
      count: ideasActivas.length,
      color: 'text-violet-600',
    },
    {
      id: 'recientes',
      label: 'Recientes',
      icon: <img src={iconClock} alt="Recientes" width={20} height={20} />, 
      count: ideasRecientes.length,
      color: 'text-blue-600',
    },
    {
      id: 'archivadas',
      label: 'Archivadas',
      icon: <img src={iconArchive} alt="Archivadas" width={20} height={20} />, 
      count: ideasArchivadas.length,
      color: 'text-slate-600',
    },
  ];

  const getIdeasForSpace = () => {
    if (selectedCapa === ('sin_capa' as any)) {
      return state.ideas.filter((i) => !i.layer && !i.isArchived && !i.completedAt);
    }

    if (selectedCapa) {
      return getIdeasPorCapa(selectedCapa);
    }

    switch (espacioActivo) {
      case 'activas':
        return ideasActivas;
      case 'recientes':
        return ideasRecientes;
      case 'archivadas':
        return ideasArchivadas;
      default:
        return ideasActivas;
    }
  };

  const currentIdeas = getIdeasForSpace();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <img src={iconLayers} alt="Espacios" width={28} height={28} className={modoCalma ? 'opacity-60' : ''} />
          Espacios Mentales
        </h1>
        <p className="text-slate-500">
          Navega entre diferentes perspectivas de tus ideas
        </p>
      </div>

      {/* Selector de espacios */}
      <div className="flex flex-wrap gap-3">
        {espacios.map((espacio) => (
          <button
            key={espacio.id}
            onClick={() => {
              setEspacioActivo(espacio.id);
              setSelectedCapa(null);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all
              ${
                espacioActivo === espacio.id && !selectedCapa
                  ? modoCalma
                    ? 'bg-slate-200 text-slate-800 shadow-md'
                    : 'bg-white shadow-lg ring-2 ring-violet-200'
                  : 'bg-white/50 hover:bg-white text-slate-600'
              }
            `}
          >
            <span className={espacio.color}>{espacio.icon}</span>
            <span className="font-medium">{espacio.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                espacioActivo === espacio.id && !selectedCapa
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {espacio.count}
            </span>
          </button>
        ))}

        {/* Completadas */}
        <button
          onClick={() => {
            // Mostrar completadas
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 text-green-700
            hover:bg-green-100 transition-all"
        >
          <img src={iconCheckCircle} alt="Completadas" width={20} height={20} />
          <span className="font-medium">Completadas</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-green-100">
            {completadas.length}
          </span>
        </button>
      </div>

      {/* Selector de capas */}
      <div>
        <h2 className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-2">
          <img src={iconFolder} alt="Filtrar por capa" width={16} height={16} />
          Filtrar por capa
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCapa(null)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                !selectedCapa
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }
            `}
          >
            Todas las capas
          </button>
          {Object.values(LAYERS).map((layer) => {
            const count = getIdeasPorCapa(layer.id as LayerType).length;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedCapa(layer.id as LayerType)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-all border-2
                  ${
                    selectedCapa === layer.id
                      ? `${layer.bgColor} ${layer.color} ${layer.borderColor}`
                      : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                <span>
                  {layer.icon && typeof layer.icon !== 'string' ? layer.icon : null}
                </span>
                <span>{layer.name}</span>
                <span className="text-xs opacity-60">({count})</span>
              </button>
            );
          })}
          {/* Mostrar ideas sin capa */}
          {state.ideas.filter((i) => !i.layer && !i.isArchived && !i.completedAt).length > 0 && (
            <button
              onClick={() => setSelectedCapa('sin_capa' as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all border-2
                ${
                  selectedCapa === ('sin_capa' as any)
                    ? 'bg-slate-200 text-slate-700 border-slate-400'
                    : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <span>📁</span>
              <span>Sin capa</span>
              <span className="text-xs opacity-60">({state.ideas.filter((i) => !i.layer && !i.isArchived && !i.completedAt).length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Lista de ideas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            {selectedCapa === ('sin_capa' as any)
              ? 'Ideas sin capa'
              : selectedCapa
                ? `Ideas de ${LAYERS[selectedCapa].name}`
                : espacios.find((e) => e.id === espacioActivo)?.label || 'Ideas'}
          </h2>
          <span className="text-sm text-slate-500">
            {currentIdeas.length} idea{currentIdeas.length !== 1 ? 's' : ''}
          </span>
        </div>

        {currentIdeas.length > 0 ? (
          <div
            className={`grid gap-4 ${
              modoCalma ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {currentIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} compact={modoCalma} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl">
            <div className="text-5xl mb-4">🧘</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Espacio vacío
            </h3>
            <p className="text-slate-500">
              {espacioActivo === 'archivadas'
                ? 'No tienes ideas archivadas'
                : selectedCapa === ('sin_capa' as any)
                  ? 'No hay ideas sin capa'
                  : selectedCapa
                    ? `No hay ideas en la capa ${LAYERS[selectedCapa].name}`
                    : 'No hay ideas en este espacio'}
            </p>
          </div>
        )}
      </div>

      {/* Estadísticas por capa */}
      {!modoCalma && (
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Distribución por capas
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {Object.values(LAYERS).map((layer) => {
              const count = getIdeasPorCapa(layer.id as LayerType).length;
              const percentage =
                ideasActivas.length > 0
                  ? Math.round((count / ideasActivas.length) * 100)
                  : 0;

              return (
                <div
                  key={layer.id}
                  className={`p-4 rounded-xl ${layer.bgColor} border ${layer.borderColor}`}
                >
                  <div className="text-2xl mb-2">
                    {layer.icon && typeof layer.icon !== 'string' ? layer.icon : null}
                  </div>
                  <div className={`text-xl font-bold ${layer.color}`}>
                    {count}
                  </div>
                  <div className="text-xs text-slate-500">{layer.name}</div>
                  <div className="mt-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${layer.color.replace('text-', 'bg-')}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
