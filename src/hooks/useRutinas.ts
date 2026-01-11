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

// Local simplified interfaces for components that don't need full type complexity
// These match the actual localStorage data structure used by existing components
interface RutinaActivaSimple {
  titulo: string;
  creada: string;
  energia: string;
  modulos: Array<{
    name: string;
    time: number;
    energy: string;
  }>;
}

interface RutinaHoySimple {
  fecha: string;
  bloqueo: string;
  categoria: string;
  energia: number;
  hora: string;
  modulos: string[];
  completada: boolean;
}

interface LogroRutinaSimple {
  fecha: string;
  mensaje: string;
}

/**
 * Hook to manage Rutinas Activas
 */
export function useRutinasActivas() {
  const [rutinas, setRutinas] = useState<RutinaActivaSimple[]>([]);
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

/**
 * Hook to manage Rutinas Hoy
 */
export function useRutinasHoy() {
  const [rutinas, setRutinas] = useState<RutinaHoySimple[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRutinas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getItem(RUTINAS_HOY_KEY);
      if (data) {
        setRutinas(JSON.parse(data));
      } else {
        setRutinas([]);
      }
    } catch (err) {
      console.error('Error loading rutinas hoy:', err);
      setRutinas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addRutina = useCallback(async (nuevaRutina: RutinaHoySimple) => {
    try {
      const data = await storage.getItem(RUTINAS_HOY_KEY);
      const rutinasHoy = data ? JSON.parse(data) : [];
      rutinasHoy.push(nuevaRutina);
      await storage.setItem(RUTINAS_HOY_KEY, JSON.stringify(rutinasHoy));
      setRutinas(rutinasHoy);
    } catch (err) {
      console.error('Error adding rutina hoy:', err);
    }
  }, []);

  useEffect(() => {
    loadRutinas();
  }, [loadRutinas]);

  return {
    rutinas,
    loading,
    addRutina,
    refresh: loadRutinas,
  };
}

/**
 * Hook to manage Logros Rutina
 */
export function useLogrosRutina() {
  const [logros, setLogros] = useState<LogroRutinaSimple[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogros = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getItem(LOGROS_RUTINA_KEY);
      if (data) {
        setLogros(JSON.parse(data));
      } else {
        setLogros([]);
      }
    } catch (err) {
      console.error('Error loading logros rutina:', err);
      setLogros([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addLogro = useCallback(async (nuevoLogro: LogroRutinaSimple) => {
    try {
      const data = await storage.getItem(LOGROS_RUTINA_KEY);
      const logros = data ? JSON.parse(data) : [];
      logros.push(nuevoLogro);
      await storage.setItem(LOGROS_RUTINA_KEY, JSON.stringify(logros));
      setLogros(logros);
    } catch (err) {
      console.error('Error adding logro rutina:', err);
    }
  }, []);

  useEffect(() => {
    loadLogros();
  }, [loadLogros]);

  return {
    logros,
    loading,
    addLogro,
    refresh: loadLogros,
  };
}

/**
 * Hook to manage encrypted thoughts (pensamientos bloqueantes)
 */
export function usePensamientosBloqueantes() {
  const [pensamiento, setPensamiento] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPensamiento = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getItem(PENSAMIENTOS_BLOQUEANTES_KEY);
      setPensamiento(data);
    } catch (err) {
      console.error('Error loading pensamiento:', err);
      setPensamiento(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const savePensamiento = useCallback(async (encrypted: string) => {
    try {
      await storage.setItem(PENSAMIENTOS_BLOQUEANTES_KEY, encrypted);
      setPensamiento(encrypted);
    } catch (err) {
      console.error('Error saving pensamiento:', err);
    }
  }, []);

  useEffect(() => {
    loadPensamiento();
  }, [loadPensamiento]);

  return {
    pensamiento,
    loading,
    savePensamiento,
    refresh: loadPensamiento,
  };
}
