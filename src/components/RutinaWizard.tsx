const CATEGORIAS = [
  { label: 'Autocuidado', value: 'autocuidado', destacado: true },
  { label: 'Trabajo', value: 'trabajo' },
  { label: 'Estudio', value: 'estudio' },
  { label: 'Hogar', value: 'hogar' },
  { label: 'Social', value: 'social' },
  { label: 'Otro', value: 'otro' },
];

import { useState } from 'react';

interface BloqueoOption {
  label: string;
  value: string;
}

const BLOQUEOS: BloqueoOption[] = [
  { label: 'Falta de energía', value: 'energia' },
  { label: 'Distracciones', value: 'distracciones' },
  { label: 'Desorganización', value: 'desorganizacion' },
  { label: 'Ansiedad', value: 'ansiedad' },
  { label: 'Otro', value: 'otro' },
];

export default function RoutineBuilder({ onFinish }: { onFinish: () => void }) {
  const [energia, setEnergia] = useState(2); // 1=bajo, 2=medio, 3=alto
  const [hora, setHora] = useState('08:00');
  const [step, setStep] = useState(0);
  const [bloqueo, setBloqueo] = useState('');
  const [categoria, setCategoria] = useState('autocuidado');
  const [showTip, setShowTip] = useState(false);
  const [tip, setTip] = useState('');

  // Paso 1: Pregunta TCC
  if (step === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-violet-700">¿Qué te bloquea hoy?</h2>
          <div className="mb-6">
            {BLOQUEOS.map(opt => (
              <label key={opt.value} className="block mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="bloqueo"
                  value={opt.value}
                  checked={bloqueo === opt.value}
                  onChange={() => setBloqueo(opt.value)}
                  className="mr-2"
                />
                {opt.label}
              </label>
            ))}
          </div>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full disabled:opacity-50"
            disabled={!bloqueo}
            onClick={() => setStep(1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }

  // Paso 2: Selección de categoría
  if (step === 1) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-violet-700">Selecciona la categoría principal</h2>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {CATEGORIAS.map(opt => (
              <button
                key={opt.value}
                className={`px-4 py-2 rounded-2xl border-2 w-full text-lg font-medium transition-all
                  ${categoria === opt.value ? 'bg-violet-100 border-violet-600 text-violet-700' : 'bg-slate-50 border-slate-200 text-slate-600'}
                  ${opt.destacado ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={() => setCategoria(opt.value)}
              >
                {opt.label} {opt.destacado && <span className="ml-1 text-yellow-500 font-bold">★</span>}
              </button>
            ))}
          </div>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full"
            onClick={() => setStep(2)}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }

  // Paso 3: Preguntas rápidas
  if (step === 2) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-violet-700">Configura tu rutina</h2>
          <div className="mb-6">
            <label className="block mb-2 text-left font-medium">Nivel de energía habitual:</label>
            <div className="flex items-center gap-2 mb-4">
              <span className={energia === 1 ? 'font-bold text-violet-600' : ''}>Bajo</span>
              <input
                type="range"
                min={1}
                max={3}
                step={1}
                value={energia}
                onChange={e => setEnergia(Number(e.target.value))}
                className="flex-1 accent-violet-600"
              />
              <span className={energia === 2 ? 'font-bold text-violet-600' : ''}>Medio</span>
              <span className={energia === 3 ? 'font-bold text-violet-600' : ''}>Alto</span>
            </div>
            <label className="block mb-2 text-left font-medium">¿A qué hora te gustaría empezar?</label>
            <input
              type="time"
              value={hora}
              onChange={e => setHora(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 mb-2"
            />
          </div>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full"
            onClick={() => setStep(3)}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }

  // Paso 4: Menú modular (selección de módulos diarios)
  const MODULOS = [
    { label: 'Ejercicio físico', value: 'ejercicio' },
    { label: 'Meditación', value: 'meditacion' },
    { label: 'Planificación', value: 'planificacion' },
    { label: 'Lectura', value: 'lectura' },
    { label: 'Tareas del hogar', value: 'hogar' },
    { label: 'Socializar', value: 'social' },
    { label: 'Alimentación saludable', value: 'alimentacion' },
    { label: 'Otro', value: 'otro' },
  ];
  const [modulosSeleccionados, setModulosSeleccionados] = useState<string[]>([]);

  if (step === 3) {
    const toggleModulo = (value: string) => {
      setModulosSeleccionados(prev =>
        prev.includes(value)
          ? prev.filter(m => m !== value)
          : prev.length < 4
            ? [...prev, value]
            : prev
      );
    };
    const handleGuardar = () => {
      // Guardar rutina en localStorage (tracking en "Hoy")
      const hoy = new Date().toISOString().slice(0, 10);
      const nuevaRutina = {
        fecha: hoy,
        bloqueo,
        categoria,
        energia,
        hora,
        modulos: modulosSeleccionados,
        completada: false,
      };
      // Guardar en localStorage bajo "rutinasHoy"
      const rutinasHoy = JSON.parse(localStorage.getItem('rutinasHoy') || '[]');
      rutinasHoy.push(nuevaRutina);
      localStorage.setItem('rutinasHoy', JSON.stringify(rutinasHoy));

      // Notificación diaria (Web Notifications API)
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('¡Recuerda tu rutina!', {
            body: `Hoy tienes una rutina programada a las ${hora}. ¡Ánimo!`,
            icon: '/favicon.ico',
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('¡Recuerda tu rutina!', {
                body: `Hoy tienes una rutina programada a las ${hora}. ¡Ánimo!`,
                icon: '/favicon.ico',
              });
            }
          });
        }
      }
      setStep(4);
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-violet-700">Elige tus módulos diarios</h2>
          <p className="mb-2 text-slate-600 text-sm">Selecciona entre 2 y 4 módulos que quieras incluir hoy.</p>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {MODULOS.map(opt => (
              <button
                key={opt.value}
                className={`px-4 py-2 rounded-2xl border-2 w-full text-base font-medium transition-all
                  ${modulosSeleccionados.includes(opt.value) ? 'bg-violet-100 border-violet-600 text-violet-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                onClick={() => toggleModulo(opt.value)}
                disabled={
                  !modulosSeleccionados.includes(opt.value) && modulosSeleccionados.length >= 4
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl shadow-lg w-full disabled:opacity-50"
            disabled={modulosSeleccionados.length < 2}
            onClick={handleGuardar}
          >
            Guardar rutina
          </button>
        </div>
      </div>
    );
  }

  // Paso 5: Confirmación y logro
  const TIPS = [
    '¡Recuerda que cada pequeño paso cuenta! 🚀',
    'La constancia es más importante que la perfección. 💡',
    '¡Hoy es un gran día para avanzar en tus rutinas! 🌞',
    'Celebra tus logros, por pequeños que sean. 🎉',
    'Tu esfuerzo suma, ¡sigue así! 💪',
  ];
  const [showTip, setShowTip] = useState(false);
  const [tip, setTip] = useState('');
  const handleLogro = () => {
    // Registrar logro en localStorage
    const logros = JSON.parse(localStorage.getItem('logrosRutina') || '[]');
    const nuevoLogro = {
      fecha: new Date().toISOString(),
      mensaje: tip,
    };
    logros.push(nuevoLogro);
    localStorage.setItem('logrosRutina', JSON.stringify(logros));
    setShowTip(false);
    onFinish();
  };
  if (step === 4) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fade-in text-center">
          <h2 className="text-2xl font-bold mb-4 text-violet-700">¡Rutina guardada!</h2>
          <p className="mb-4 text-slate-600">Tu rutina ha sido registrada para hoy y aparecerá en la sección "Hoy".</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg mt-2"
            onClick={() => {
              setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
              setShowTip(true);
            }}
          >
            ¡Marcar como completada!
          </button>
          {showTip && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm animate-fade-in text-center">
                <h3 className="text-xl font-bold mb-2 text-violet-700">¡Logro registrado!</h3>
                <p className="mb-4 text-slate-700">{tip}</p>
                <button
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-2xl shadow"
                  onClick={handleLogro}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ...otros pasos del wizard aquí...

  return null;
}
