// src/components/RoutineBuilder.js (modal → wizard)
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { usePensamientosBloqueantes } from '../hooks/useRutinas';

const RoutineBuilder = ({ onClose }) => {
  const { savePensamiento } = usePensamientosBloqueantes();
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState('');
  const [energy, setEnergy] = useState('medio');
  const [modules, setModules] = useState([]); // Seleccionados

  // Ejemplo módulos autocuidado (adaptables)
  const availableModules = [
    { id: '1', name: 'Lavado cara exprés (2 min)', energy: 'bajo', time: 2 },
    { id: '2', name: 'Ducha completa (10 min)', energy: 'medio', time: 10 },
    { id: '3', name: 'Respiración 4-7-8 (ansiedad, 3 min)', energy: 'bajo', time: 3 },
    { id: '4', name: 'Hidratación + crema (5 min)', energy: 'bajo', time: 5 },
    { id: '5', name: 'Estiramientos suaves (8 min)', energy: 'medio', time: 8 },
  ];

  // Encriptar pensamiento usando hook unificado
  const saveEncryptedThought = async (text) => {
    const passphrase = 'tu-passphrase-segura'; // → hazla dinámica (input usuario)
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify({ text, date: new Date() }), passphrase).toString();
    await savePensamiento(encrypted);
  };

  // Paso 1: Pensamiento bloqueante (opciones múltiples)
  const thoughtsOptions = [
    "No lo mantendré (todo-o-nada)",
    "Debe ser perfecto o no sirve",
    "No tengo energía para empezar",
    "Me aburro rápido",
    "Otro (escribe abajo)",
  ];

  if (step === 1) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl max-w-md w-full">
          <h2 className="text-2xl mb-4">Tu mente está despejada... pero ¿qué te bloquea hoy?</h2>
          {thoughtsOptions.map(opt => (
            <label key={opt} className="block mb-2">
              <input type="radio" name="thought" value={opt} onChange={() => setThought(opt)} />
              {opt}
            </label>
          ))}
          <textarea
            className="w-full p-2 border mt-4"
            placeholder="Otro pensamiento..."
            onChange={e => setThought(e.target.value)}
          />
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full"
            onClick={() => { saveEncryptedThought(thought); setStep(2); }}
          >
            Siguiente → Descomponemos la rutina
          </button>
          <button onClick={onClose} className="mt-2 text-gray-500">Cancelar</button>
        </div>
      </div>
    );
  }

  // Paso 2: Energía + selección módulos (simplificado)
  if (step === 2) {
    const filtered = availableModules.filter(m => energy === 'bajo' ? m.energy === 'bajo' : true);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl max-w-md w-full">
          <h2>Elige tu nivel de energía hoy</h2>
          <select value={energy} onChange={e => setEnergy(e.target.value)} className="w-full p-2 border mb-4">
            <option value="bajo">Bajo (día difícil)</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>

          <h3>Módulos sugeridos (elige 2-4)</h3>
          {filtered.map(mod => (
            <label key={mod.id} className="block mb-2">
              <input type="checkbox" onChange={e => {
                if (e.target.checked) setModules([...modules, mod]);
                else setModules(modules.filter(m => m.id !== mod.id));
              }} />
              {mod.name}
            </label>
          ))}

          <button
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full"
            onClick={() => {
              // Notificación simple con Web Notifications API
              if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                  new Notification('¡Rutina activada!', {
                    body: 'Recuerda revisar tu rutina hoy. ¡Tú puedes!',
                  });
                } else if (Notification.permission !== 'denied') {
                  Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                      new Notification('¡Rutina activada!', {
                        body: 'Recuerda revisar tu rutina hoy. ¡Tú puedes!',
                      });
                    }
                  });
                }
              }
              setStep(3); // Avanza a siguiente paso o cierra modal
            }}
          >
            Guardar y activar rutina
          </button>
          {/* Pop-up tip ejemplo */}
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            Tip (de Activación Conductual): "Empieza con lo mínimo: algo es mejor que nada y genera momentum"
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RoutineBuilder;