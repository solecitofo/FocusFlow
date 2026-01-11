/**
 * Custom hooks for managing routines with centralized storage
 * Replaces direct localStorage access in components
 */

import { useState, useEffect, useCallback } from 'react';
import * as storage from '../utils/storage';

// Storage keys
const RUTINAS_ACTIVAS_KEY = 'rutinasActivas';
const RUTINAS_HOY_KEY = 'rutinasHoy';
const LOGROS_RUTINA_KEY = 'logrosRutina';
const PENSAMIENTOS_BLOQUEANTES_KEY = 'encryptedThoughts';

/**
 * Interface for Rutina Activa
 */
export interface RutinaActiva {
  titulo: string;
  creada: string;
  energia: string;
  modulos: Array<{
    name: string;
    time: number;
    energy: string;
  }>;
}

/**
 * Hook to manage Rutinas Activas
 */
export function useRutinasActivas() {
  const [rutinas, setRutinas] = useState<RutinaActiva[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRutinas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getItem(RUTINAS_ACTIVAS_KEY);
      if (data) {
        setRutinas(JSON.parse(data));
      } else {
        setRutinas([]);
      }
    } catch (err) {
      console.error('Error loading rutinas activas:', err);
      setRutinas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRutinas();
  }, [loadRutinas]);

  return {
    rutinas,
    loading,
    refresh: loadRutinas,
  };
}
