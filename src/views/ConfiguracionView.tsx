import React from 'react';
import { useApp } from '../context/AppContext';

// Iconos personalizados

export function ConfiguracionView() {
  const { state, setModoCalma, dispatch } = useApp();
  const { modoCalma, mostrarCompletadas, mostrarArchivadas } = state.settings;

  const ideasCount = state.ideas.length;
  const completadasCount = state.ideas.filter((i) => i.completedAt).length;
  const archivadasCount = state.ideas.filter((i) => i.isArchived).length;

  const handleExport = () => {
    const data = {
      ideas: state.ideas,
      settings: state.settings,
      exportedAt: new Date().toISOString(),
      version: '2.0.0',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focusflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (data.ideas && Array.isArray(data.ideas)) {
          dispatch({
            type: 'LOAD_STATE',
            payload: {
              ideas: data.ideas,
              settings: data.settings || state.settings,
            },
          });
          alert('Datos importados correctamente');
        }
      } catch (error) {
        alert('Error al importar el archivo');
      }
    };
    input.click();
  };

  const handleClearCompleted = () => {
    if (window.confirm('¿Eliminar todas las ideas completadas?')) {
      state.ideas
        .filter((i) => i.completedAt)
        .forEach((i) => dispatch({ type: 'DELETE_IDEA', payload: i.id }));
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        '¿Eliminar TODAS las ideas? Esta acción no se puede deshacer.'
      )
    ) {
      state.ideas.forEach((i) =>
        dispatch({ type: 'DELETE_IDEA', payload: i.id })
      );
    }
  };

  const SettingRow = ({
    icon,
    title,
    description,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-slate-100">{icon}</div>
        <div>
          <h3 className="font-medium text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-violet-500' : 'bg-slate-300'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <img src={require('../assets/iconos/Settings.png')} alt="Configuración" width={28} height={28} className={modoCalma ? 'opacity-60' : ''} />
          Configuración
        </h1>
        <p className="text-slate-500">
          Personaliza FocusFlow según tus preferencias
        </p>
      </div>

      {/* Sección: Apariencia */}
      <div>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Apariencia</h2>
        <div className="space-y-3">
          <SettingRow
            icon={modoCalma ? (
              <img src={require('../assets/iconos/Moon.png')} alt="Modo Calma" width={20} height={20} />
            ) : (
              <img src={require('../assets/iconos/Sun.png')} alt="Modo Claro" width={20} height={20} />
            )}
            title="Modo Calma"
            description="Reduce el ruido visual para mayor concentración"
          >
            <Toggle enabled={modoCalma} onChange={() => setModoCalma(!modoCalma)} />
          </SettingRow>

          <SettingRow
            icon={<img src={require('../assets/iconos/Eye.png')} alt="Mostrar completadas" width={20} height={20} />}
            title="Mostrar completadas"
            description="Muestra ideas ya completadas en las listas"
          >
            <Toggle
              enabled={mostrarCompletadas}
              onChange={() =>
                dispatch({
                  type: 'LOAD_STATE',
                  payload: {
                    settings: {
                      ...state.settings,
                      mostrarCompletadas: !mostrarCompletadas,
                    },
                  },
                })
              }
            />
          </SettingRow>

          <SettingRow
            icon={<img src={require('../assets/iconos/EyeOff.png')} alt="Mostrar archivadas" width={20} height={20} />}
            title="Mostrar archivadas"
            description="Muestra ideas archivadas en las listas"
          >
            <Toggle
              enabled={mostrarArchivadas}
              onChange={() =>
                dispatch({
                  type: 'LOAD_STATE',
                  payload: {
                    settings: {
                      ...state.settings,
                      mostrarArchivadas: !mostrarArchivadas,
                    },
                  },
                })
              }
            />
          </SettingRow>
        </div>
      </div>

      {/* Sección: Datos */}
      <div>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Datos</h2>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-violet-50 rounded-xl text-center">
            <div className="text-2xl font-bold text-violet-700">{ideasCount}</div>
            <div className="text-sm text-violet-600">Total de ideas</div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-700">
              {completadasCount}
            </div>
            <div className="text-sm text-green-600">Completadas</div>
          </div>
          <div className="p-4 bg-slate-100 rounded-xl text-center">
            <div className="text-2xl font-bold text-slate-700">
              {archivadasCount}
            </div>
            <div className="text-sm text-slate-600">Archivadas</div>
          </div>
        </div>

        <div className="space-y-3">
          <SettingRow
            icon={<img src={require('../assets/iconos/Download.png')} alt="Exportar datos" width={20} height={20} />}
            title="Exportar datos"
            description="Descarga una copia de todas tus ideas"
          >
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </SettingRow>

          <SettingRow
            icon={<img src={require('../assets/iconos/Upload.png')} alt="Importar datos" width={20} height={20} />}
            title="Importar datos"
            description="Restaura ideas desde un archivo de backup"
          >
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300
                transition-colors text-sm font-medium"
            >
              Importar
            </button>
          </SettingRow>
        </div>
      </div>

      {/* Sección: Zona de peligro */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-4">Zona de peligro</h2>
        <div className="space-y-3">
          <SettingRow
            icon={<img src={require('../assets/iconos/Trash2.png')} alt="Limpiar completadas" width={20} height={20} style={{ filter: 'hue-rotate(30deg)' }} />}
            title="Limpiar completadas"
            description={`Elimina ${completadasCount} ideas completadas`}
          >
            <button
              onClick={handleClearCompleted}
              disabled={completadasCount === 0}
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg
                hover:bg-orange-200 transition-colors text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Limpiar
            </button>
          </SettingRow>

          <SettingRow
            icon={<img src={require('../assets/iconos/Trash2.png')} alt="Eliminar todo" width={20} height={20} style={{ filter: 'hue-rotate(-30deg)' }} />}
            title="Eliminar todo"
            description="Elimina todas las ideas permanentemente"
          >
            <button
              onClick={handleClearAll}
              disabled={ideasCount === 0}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg
                hover:bg-red-200 transition-colors text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Eliminar todo
            </button>
          </SettingRow>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-slate-500 text-sm">
        <p className="mb-2">FocusFlow v2.0.0</p>
        <p>Diseñado con amor para mentes inquietas</p>
      </div>
    </div>
  );
}
