// === CAPAS (Layers) - Categorías de ideas ===
export type LayerType = 'personal' | 'trabajo' | 'proyectos' | 'inspiracion' | 'referencias';

export interface Layer {
  id: LayerType;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

// === ESTADOS de Ideas ===
export type IdeaStatus = 'semilla' | 'en_desarrollo' | 'lista';

export interface StatusConfig {
  id: IdeaStatus;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

// === TIPOS de Ideas ===
export type IdeaType = 'todo_el_dia' | 'rapida';

// === BLOQUES DE ENERGÍA ===
export type EnergyBlock = 'alta' | 'media' | 'baja';

export interface EnergyBlockConfig {
  id: EnergyBlock;
  name: string;
  timeRange: string;
  description: string;
  color: string;
}

// === IDEA Principal ===
export interface Idea {
  id: string;
  title: string;
  description?: string;
  layer: LayerType;
  status: IdeaStatus;
  type: IdeaType;
  energyBlock?: EnergyBlock;
  date?: string; // ISO date string YYYY-MM-DD
  time?: string; // HH:mm format
  isArchived: boolean;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// === ESPACIOS MENTALES ===
export type MentalSpace = 'hoy' | 'activas' | 'recientes' | 'archivadas' | 'calendario';

// === VISTAS ===
export type ViewType =
  | 'home'
  | 'hoy'
  | 'captura'
  | 'calendario'
  | 'semana'
  | 'espacios'
  | 'configuracion'
  | 'detalle';

// === CONFIGURACIÓN DE USUARIO ===
export interface UserSettings {
  modoCalma: boolean;
  espacioActivo: MentalSpace;
  capaActiva: LayerType | 'todas';
  mostrarCompletadas: boolean;
  mostrarArchivadas: boolean;
}

// === ESTADO GLOBAL DE LA APP ===
export interface AppState {
  ideas: Idea[];
  settings: UserSettings;
  currentView: ViewType;
  selectedIdeaId: string | null;
  isQuickCaptureOpen: boolean;
  currentDate: Date;
}

// === ACCIONES DEL REDUCER ===
export type AppAction =
  | { type: 'ADD_IDEA'; payload: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_IDEA'; payload: Partial<Idea> & { id: string } }
  | { type: 'DELETE_IDEA'; payload: string }
  | { type: 'ARCHIVE_IDEA'; payload: string }
  | { type: 'COMPLETE_IDEA'; payload: string }
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SELECT_IDEA'; payload: string | null }
  | { type: 'TOGGLE_QUICK_CAPTURE' }
  | { type: 'SET_MODO_CALMA'; payload: boolean }
  | { type: 'SET_ESPACIO_ACTIVO'; payload: MentalSpace }
  | { type: 'SET_CAPA_ACTIVA'; payload: LayerType | 'todas' }
  | { type: 'SET_CURRENT_DATE'; payload: Date }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

// === CONFIGURACIÓN DE CAPAS ===
export const LAYERS: Record<LayerType, Layer> = {
  personal: {
    id: 'personal',
    name: 'Personal',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    icon: '🏠',
  },
  trabajo: {
    id: 'trabajo',
    name: 'Trabajo',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: '💼',
  },
  proyectos: {
    id: 'proyectos',
    name: 'Proyectos',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    icon: '🚀',
  },
  inspiracion: {
    id: 'inspiracion',
    name: 'Inspiración',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: '✨',
  },
  referencias: {
    id: 'referencias',
    name: 'Referencias',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    icon: '📚',
  },
};

// === CONFIGURACIÓN DE ESTADOS ===
export const STATUS_CONFIG: Record<IdeaStatus, StatusConfig> = {
  semilla: {
    id: 'semilla',
    name: 'Semilla',
    emoji: '🌱',
    description: 'Idea inicial, aún por desarrollar',
    color: 'text-green-600',
  },
  en_desarrollo: {
    id: 'en_desarrollo',
    name: 'En desarrollo',
    emoji: '🌿',
    description: 'Trabajando en esta idea',
    color: 'text-yellow-600',
  },
  lista: {
    id: 'lista',
    name: 'Lista',
    emoji: '🌳',
    description: 'Lista para ejecutar',
    color: 'text-emerald-600',
  },
};

// === CONFIGURACIÓN DE BLOQUES DE ENERGÍA ===
export const ENERGY_BLOCKS: Record<EnergyBlock, EnergyBlockConfig> = {
  alta: {
    id: 'alta',
    name: 'Energía Alta',
    timeRange: '09:00 - 12:00',
    description: 'Tu momento de máximo rendimiento',
    color: 'bg-orange-100 border-orange-300',
  },
  media: {
    id: 'media',
    name: 'Energía Media',
    timeRange: '14:00 - 17:00',
    description: 'Buen momento para tareas moderadas',
    color: 'bg-yellow-100 border-yellow-300',
  },
  baja: {
    id: 'baja',
    name: 'Energía Baja',
    timeRange: '17:00 - 21:00',
    description: 'Tareas ligeras y rutinarias',
    color: 'bg-blue-100 border-blue-300',
  },
};
