import { useState } from 'react';
import RoutineBuilder from '../components/RoutineBuilder';
import RutinasActivasCards from './RutinasActivasCards';
import enConstruccion from '../assets/illustrations/Enconstruccion.png';
import { useApp } from '../context/AppContext';


export default function RutinasView() {
  const [showBuilder, setShowBuilder] = useState(false);
  const { setView } = useApp();
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto text-center py-12">
        <img 
          src={enConstruccion} 
          alt="En construcción" 
          className="w-full max-w-md mx-auto mb-8"
        />
        <h1 className="text-3xl font-bold mb-4 text-violet-700">Función en Desarrollo</h1>
        <p className="text-slate-600 text-lg mb-8">
          Estamos trabajando en el módulo de Rutinas. Pronto podrás construir y gestionar tus rutinas diarias.
        </p>
        <button
          onClick={() => setView('home')}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
