import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, Idea, ViewType, MentalSpace, LayerType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Estado inicial
const initialState: AppState = {
  ideas: [],
  settings: {
    modoCalma: false,
    espacioActivo: 'hoy',
    capaActiva: 'todas',
    mostrarCompletadas: false,
    mostrarArchivadas: false,
  },
  currentView: 'home',
  selectedIdeaId: null,
  isQuickCaptureOpen: false,
  currentDate: new Date(),
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_IDEA': {
      const now = new Date().toISOString();
      const newIdea: Idea = {
        ...action.payload,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      };
      return {
        ...state,
        ideas: [newIdea, ...state.ideas],
      };
    }

    case 'UPDATE_IDEA': {
      return {
        ...state,
        ideas: state.ideas.map((idea) =>
          idea.id === action.payload.id
            ? { ...idea, ...action.payload, updatedAt: new Date().toISOString() }
            : idea
        ),
      };
    }

    case 'DELETE_IDEA': {
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.payload),
        selectedIdeaId: state.selectedIdeaId === action.payload ? null : state.selectedIdeaId,
      };
    }

    case 'ARCHIVE_IDEA': {
      return {
        ...state,
        ideas: state.ideas.map((idea) =>
          idea.id === action.payload
            ? { ...idea, isArchived: !idea.isArchived, updatedAt: new Date().toISOString() }
            : idea
        ),
      };
    }

    case 'COMPLETE_IDEA': {
      return {
        ...state,
        ideas: state.ideas.map((idea) =>
          idea.id === action.payload
            ? {
                ...idea,
                completedAt: idea.completedAt ? undefined : new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : idea
        ),
      };
    }

    case 'SET_VIEW': {
      return {
        ...state,
        currentView: action.payload,
      };
    }

    case 'SELECT_IDEA': {
      return {
        ...state,
        selectedIdeaId: action.payload,
        currentView: action.payload ? 'detalle' : state.currentView,
      };
    }

    case 'TOGGLE_QUICK_CAPTURE': {
      return {
        ...state,
        isQuickCaptureOpen: !state.isQuickCaptureOpen,
      };
    }

    case 'SET_MODO_CALMA': {
      return {
        ...state,
        settings: {
          ...state.settings,
          modoCalma: action.payload,
        },
      };
    }

    case 'SET_ESPACIO_ACTIVO': {
      return {
        ...state,
        settings: {
          ...state.settings,
          espacioActivo: action.payload,
        },
      };
    }

    case 'SET_CAPA_ACTIVA': {
      return {
        ...state,
        settings: {
          ...state.settings,
          capaActiva: action.payload,
        },
      };
    }

    case 'SET_CURRENT_DATE': {
      return {
        ...state,
        currentDate: action.payload,
      };
    }

    case 'LOAD_STATE': {
      return {
        ...state,
        ...action.payload,
        settings: {
          ...state.settings,
          ...(action.payload.settings || {}),
        },
      };
    }

    default:
      return state;
  }
}

// Contexto
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helpers
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIdea: (idea: Partial<Idea> & { id: string }) => void;
  deleteIdea: (id: string) => void;
  archiveIdea: (id: string) => void;
  completeIdea: (id: string) => void;
  setView: (view: ViewType) => void;
  selectIdea: (id: string | null) => void;
  toggleQuickCapture: () => void;
  setModoCalma: (value: boolean) => void;
  setEspacioActivo: (espacio: MentalSpace) => void;
  setCapaActiva: (capa: LayerType | 'todas') => void;
  // Getters filtrados
  getIdeasHoy: () => Idea[];
  getIdeasActivas: () => Idea[];
  getIdeasRecientes: () => Idea[];
  getIdeasArchivadas: () => Idea[];
  getIdeasPorFecha: (fecha: string) => Idea[];
  getIdeasPorCapa: (capa: LayerType) => Idea[];
  getSelectedIdea: () => Idea | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

// Storage keys
const STORAGE_KEY = 'focusflow-state';

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar estado al iniciar
  useEffect(() => {
    const loadState = async () => {
      try {
        let savedState: string | null = null;

        if (window.storage?.get) {
          const result = await window.storage.get(STORAGE_KEY);
          savedState = result.value;
        } else {
          savedState = localStorage.getItem(STORAGE_KEY);
        }

        if (savedState) {
          const parsed = JSON.parse(savedState);
          dispatch({ type: 'LOAD_STATE', payload: parsed });
        }
      } catch (error) {
        console.log('No hay estado previo guardado');
      }
    };

    loadState();
  }, []);

  // Guardar estado cuando cambie
  useEffect(() => {
    const saveState = async () => {
      try {
        const stateToSave = {
          ideas: state.ideas,
          settings: state.settings,
        };

        const serialized = JSON.stringify(stateToSave);

        if (window.storage?.set) {
          await window.storage.set(STORAGE_KEY, serialized);
        } else {
          localStorage.setItem(STORAGE_KEY, serialized);
        }
      } catch (error) {
        console.error('Error guardando estado:', error);
      }
    };

    saveState();
  }, [state.ideas, state.settings]);

  // Helpers
  const addIdea = (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_IDEA', payload: idea });
  };

  const updateIdea = (idea: Partial<Idea> & { id: string }) => {
    dispatch({ type: 'UPDATE_IDEA', payload: idea });
  };

  const deleteIdea = (id: string) => {
    dispatch({ type: 'DELETE_IDEA', payload: id });
  };

  const archiveIdea = (id: string) => {
    dispatch({ type: 'ARCHIVE_IDEA', payload: id });
  };

  const completeIdea = (id: string) => {
    dispatch({ type: 'COMPLETE_IDEA', payload: id });
  };

  const setView = (view: ViewType) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  const selectIdea = (id: string | null) => {
    dispatch({ type: 'SELECT_IDEA', payload: id });
  };

  const toggleQuickCapture = () => {
    dispatch({ type: 'TOGGLE_QUICK_CAPTURE' });
  };

  const setModoCalma = (value: boolean) => {
    dispatch({ type: 'SET_MODO_CALMA', payload: value });
  };

  const setEspacioActivo = (espacio: MentalSpace) => {
    dispatch({ type: 'SET_ESPACIO_ACTIVO', payload: espacio });
  };

  const setCapaActiva = (capa: LayerType | 'todas') => {
    dispatch({ type: 'SET_CAPA_ACTIVA', payload: capa });
  };

  // Getters filtrados
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getIdeasHoy = () => {
    const today = getTodayString();
    return state.ideas.filter(
      (idea) =>
        !idea.isArchived &&
        !idea.completedAt &&
        (idea.date === today || idea.type === 'todo_el_dia' || !idea.date)
    );
  };

  const getIdeasActivas = () => {
    return state.ideas.filter((idea) => !idea.isArchived && !idea.completedAt);
  };

  const getIdeasRecientes = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return state.ideas
      .filter((idea) => new Date(idea.createdAt) >= sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getIdeasArchivadas = () => {
    return state.ideas.filter((idea) => idea.isArchived);
  };

  const getIdeasPorFecha = (fecha: string) => {
    return state.ideas.filter(
      (idea) => idea.date === fecha && !idea.isArchived && !idea.completedAt
    );
  };

  const getIdeasPorCapa = (capa: LayerType) => {
    return state.ideas.filter(
      (idea) => idea.layer === capa && !idea.isArchived && !idea.completedAt
    );
  };

  const getSelectedIdea = () => {
    return state.ideas.find((idea) => idea.id === state.selectedIdeaId);
  };

  const value: AppContextType = {
    state,
    dispatch,
    addIdea,
    updateIdea,
    deleteIdea,
    archiveIdea,
    completeIdea,
    setView,
    selectIdea,
    toggleQuickCapture,
    setModoCalma,
    setEspacioActivo,
    setCapaActiva,
    getIdeasHoy,
    getIdeasActivas,
    getIdeasRecientes,
    getIdeasArchivadas,
    getIdeasPorFecha,
    getIdeasPorCapa,
    getSelectedIdea,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook personalizado
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
}
