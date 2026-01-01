import React from 'react';
import { useApp } from '../context/AppContext';
import { IdeaCard } from '../components/IdeaCard';
import { STATUS_CONFIG, ENERGY_BLOCKS } from '../types';
import { formatDate } from '../utils/dateUtils';
import SunIcon from '../assets/iconos/Sun.png';
import SparklesIcon from '../assets/iconos/Sparkles.png';
import ClockIcon from '../assets/iconos/Clock.png';
import ZapIcon from '../assets/iconos/Zap.png';

// Iconos personalizados

export function HoyView() {
  const { state } = useApp();
  const { modoCalma } = state.settings;

  const todayISO = new Date().toISOString().split('T')[0];
  // Mostrar únicamente ideas con fecha exactamente hoy (no incluye sin fecha)
  const ideasFiltradas = state.ideas.filter(
    (idea) =>
      idea.date === todayISO &&
      !idea.isArchived &&
      !idea.completedAt
  );

  // Agrupar por bloque de energía
  const ideasPorEnergia = {
    alta: ideasFiltradas.filter((i) => i.energyBlock === 'alta'),
    media: ideasFiltradas.filter((i) => i.energyBlock === 'media'),
    baja: ideasFiltradas.filter((i) => i.energyBlock === 'baja'),
    sin_asignar: ideasFiltradas.filter((i) => !i.energyBlock),
  };

  // Agrupar por tipo
  const ideasPorTipo = {
    idea: ideasFiltradas.filter((i) => i.type === 'idea'),
    proyecto: ideasFiltradas.filter((i) => i.type === 'proyecto'),
  };

  // Alias usados en la UI
  const ideasTodoElDia = ideasPorTipo.proyecto;
  const ideasRapidas = ideasPorTipo.idea;

  const EnergyBlockSection = ({
    block,
    ideas,
    icon,
    title,
    description,
  }: {
    block: 'alta' | 'media' | 'baja';
    ideas: typeof ideasFiltradas;
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => {
    const config = ENERGY_BLOCKS[block];

    if (modoCalma && ideas.length === 0) return null;

    return (
      <div className={`p-4 rounded-2xl border-2 ${config.color}`}>
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
          <span className="ml-auto text-sm text-slate-400">{config.timeRange}</span>
        </div>

        {ideas.length > 0 ? (
          <div className="space-y-2">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} compact />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic text-center py-4">
            Ninguna idea asignada a este bloque
          </p>
        )}

        {/* Área para arrastrar */}
        <div className="mt-3 p-2 border-2 border-dashed border-slate-200 rounded-xl text-center">
          <p className="text-xs text-slate-400">
            Arrastra ideas aquí o haz clic en una idea para asignarla
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <img src={SunIcon} alt="Hoy" width={28} height={28} className="text-amber-500" />
          Hoy
        </h1>
        <span className="text-slate-500 capitalize text-sm">{formatDate(new Date())}</span>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">{ideasFiltradas.length}</div>
          <div className="text-xs text-slate-500">ideas para hoy</div>
        </div>
      </div>

      {/* Mensaje de estado */}
      {ideasFiltradas.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            ¡Día despejado!
          </h2>
          <p className="text-slate-500">
            No tienes ideas pendientes para hoy. Disfruta tu tiempo libre.
          </p>
        </div>
      ) : (
        <>
          {/* Ideas de todo el día (grandes) */}
          {ideasTodoElDia.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <img src={SparklesIcon} alt="Ideas grandes" width={20} height={20} className="text-violet-500" />
                Ideas grandes (todo el día)
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {ideasTodoElDia.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            </div>
          )}

          {/* Bloques de energía */}
          {!modoCalma && (
            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <img src={ClockIcon} alt="Bloques de energía" width={20} height={20} className="text-blue-500" />
                Organiza por bloques de energía
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <EnergyBlockSection
                  block="alta"
                  ideas={ideasPorEnergia.alta}
                  icon={<img src={ZapIcon} alt="Energía Alta" width={24} height={24} className="text-orange-500" />}
                  title="Energía Alta"
                  description="Tu momento de máximo rendimiento"
                />
                <EnergyBlockSection
                  block="media"
                  ideas={ideasPorEnergia.media}
                  icon={<img src={ZapIcon} alt="Energía Media" width={24} height={24} className="text-yellow-500" />}
                  title="Energía Media"
                  description="Tareas moderadas"
                />
                <EnergyBlockSection
                  block="baja"
                  ideas={ideasPorEnergia.baja}
                  icon={<img src={ZapIcon} alt="Energía Baja" width={24} height={24} className="text-blue-500" />}
                  title="Energía Baja"
                  description="Tareas ligeras y rutinarias"
                />
              </div>
            </div>
          )}

          {/* Ideas rápidas sin asignar */}
          {(ideasPorEnergia.sin_asignar.length > 0 || modoCalma) && (
            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">
                {modoCalma ? 'Ideas para hoy' : 'Ideas sin bloque asignado'}
              </h2>
              <div className="space-y-3">
                {(modoCalma ? ideasRapidas : ideasPorEnergia.sin_asignar).map(
                  (idea) => (
                    <IdeaCard key={idea.id} idea={idea} compact={modoCalma} />
                  )
                )}
              </div>
            </div>
          )}

          {/* Estado de las ideas */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {Object.values(STATUS_CONFIG).map((status) => {
              const count = ideasFiltradas.filter(
                (i) => i.status === status.id
              ).length;
              return (
                <div
                  key={status.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 text-center"
                >
                  <div className="text-2xl mb-1">{status.emoji}</div>
                  <div className="text-xl font-bold text-slate-800">{count}</div>
                  <div className="text-xs text-slate-500">{status.name}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
