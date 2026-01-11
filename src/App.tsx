import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { HoyView } from './views/HoyView';
import { CalendarioView } from './views/CalendarioView';
import { AgendaView } from './views/AgendaView';
import { EspaciosView } from './views/EspaciosView';
import { DetalleView } from './views/DetalleView';
import { ConfiguracionView } from './views/ConfiguracionView';
import RutinasView from './views/RutinasView';
import { ModoCalmaView } from './views/ModoCalmaView';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  const { state } = useApp();
  const { currentView, settings } = state;
  const { modoCalma } = settings;

  // Si Modo Calma está activo, mostrar ModoCalmaView directamente
  if (modoCalma) {
    return <ModoCalmaView />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'hoy':
        return <HoyView />;
      case 'calendario':
      case 'semana':
        return <CalendarioView />;
      case 'agenda':
        return <AgendaView />;
      case 'espacios':
        return <EspaciosView />;
      case 'detalle':
        return <DetalleView />;
      case 'configuracion':
        return <ConfiguracionView />;
      case 'rutinas':
        return <RutinasView />;
      default:
        return <HomeView />;
    }
  };

  return <Layout>{renderView()}</Layout>;
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
