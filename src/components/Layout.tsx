import React from 'react';
import { useApp } from '../context/AppContext';
import { Navigation } from './Navigation';
import { QuickCapture } from './QuickCapture';
import { ModoCalmaIndicator } from './ModoCalmaIndicator';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { state } = useApp();
  const { modoCalma } = state.settings;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        modoCalma
          ? 'bg-slate-50'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50'
      }`}
    >
      {/* Indicador de Modo Calma */}
      {modoCalma && <ModoCalmaIndicator />}

      {/* Navegación superior */}
      <Navigation />

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div
          className={`transition-all duration-300 ${
            modoCalma ? 'max-w-2xl mx-auto' : ''
          }`}
        >
          {children}
        </div>
      </main>

      {/* Captura rápida flotante */}
      {state.isQuickCaptureOpen && <QuickCapture />}

      {/* Botón flotante de captura rápida */}
      <FloatingCaptureButton />
    </div>
  );
}

function FloatingCaptureButton() {
  const { toggleQuickCapture, state } = useApp();
  const { modoCalma } = state.settings;

  return (
    <button
      onClick={toggleQuickCapture}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg
        flex items-center justify-center text-white text-2xl
        transition-all duration-300 hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-4 focus:ring-offset-2
        ${
          modoCalma
            ? 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-300'
            : 'bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 focus:ring-violet-300'
        }
        ${state.isQuickCaptureOpen ? 'rotate-45' : ''}
      `}
      aria-label={state.isQuickCaptureOpen ? 'Cerrar captura rápida' : 'Captura rápida'}
    >
      +
    </button>
  );
}
