import React, { useState } from 'react';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

const RutinasActivasCards = ({ onEdit }: { onEdit: () => void }) => {
  const [selected, setSelected] = useState<number|null>(null);
  const rutinas = JSON.parse(localStorage.getItem('rutinasActivas') || '[]');

  if (rutinas.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold text-violet-700 mb-4 text-center">Rutinas activas</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {rutinas.map((rut: any, idx: number) => (
          <div
            key={idx}
            className={`rounded-3xl bg-white shadow-lg p-6 border-2 ${selected===idx?'border-violet-500':'border-violet-100'} transition-all`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-violet-700 text-lg">{rut.titulo || `Rutina #${idx+1}`}</span>
              <button
                className="text-xs text-blue-600 hover:underline"
                onClick={() => setSelected(selected===idx?null:idx)}
              >
                {selected===idx?'Ocultar':'Ver detalles'}
              </button>
            </div>
            <div className="text-slate-500 text-sm mb-2">Creada: {formatDate(rut.creada)}</div>
            <div className="text-slate-600 text-sm mb-2">Energía: <span className="font-medium">{rut.energia}</span></div>
            <div className="text-slate-600 text-sm mb-2">Módulos: <span className="font-medium">{rut.modulos?.length||0}</span></div>
            {selected===idx && (
              <div className="mt-2 text-left">
                <div className="mb-2 font-semibold text-violet-600">Detalle de módulos:</div>
                <ul className="list-disc ml-6 mb-2">
                  {rut.modulos?.map((m:any,i:number)=>(
                    <li key={i} className="mb-1">{m.name} <span className="text-xs text-slate-400">({m.time} min, energía: {m.energy})</span></li>
                  ))}
                </ul>
                <button
                  className="mt-2 px-4 py-2 rounded-xl bg-violet-100 text-violet-700 hover:bg-violet-200 text-sm"
                  onClick={onEdit}
                >
                  Editar rutina
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RutinasActivasCards;