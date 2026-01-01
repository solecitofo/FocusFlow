import { useApp } from '../context/AppContext';
import enConstruccion from '../assets/illustrations/Enconstruccion.png';

export function ModoCalmaView() {
  const { setModoCalma } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <img 
          src={enConstruccion} 
          alt="Modo Calma en construcción" 
          className="w-full max-w-md mx-auto mb-8"
        />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Modo Calma
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Estamos trabajando para crear una experiencia serena y enfocada para ti.
        </p>
        <button
          onClick={() => setModoCalma(false)}
          className="px-6 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
        >
          Salir del Modo Calma
        </button>
      </div>
    </div>
  );
}
