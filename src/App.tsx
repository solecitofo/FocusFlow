// ...existing code...
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { HoyView } from './views/HoyView';
import { CalendarioView } from './views/CalendarioView';
import { EspaciosView } from './views/EspaciosView';
import { DetalleView } from './views/DetalleView';
import { ConfiguracionView } from './views/ConfiguracionView';

function AppContent() {
  const { state } = useApp();
  const { currentView } = state;

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'hoy':
        return <HoyView />;
      case 'calendario':
      case 'semana':
        return <CalendarioView />;
      case 'espacios':
        return <EspaciosView />;
      case 'detalle':
        return <DetalleView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <HomeView />;
    }
  };

  return <Layout>{renderView()}</Layout>;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
