import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  useRutinasActivas,
  useRutinasHoy,
  useLogrosRutina,
  usePensamientosBloqueantes,
} from '../hooks/useRutinas';
import * as storage from '../utils/storage';

describe('Rutinas Hooks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('useRutinasActivas', () => {
    it('should initialize with empty rutinas', async () => {
      const { result } = renderHook(() => useRutinasActivas());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.rutinas).toEqual([]);
    });

    it('should load rutinas from storage', async () => {
      const mockRutinas = [
        {
          titulo: 'Test Rutina',
          creada: '2026-01-11',
          energia: 'media',
          modulos: [{ name: 'Test Module', time: 10, energy: 'media' }],
        },
      ];

      await storage.setItem('rutinasActivas', JSON.stringify(mockRutinas));

      const { result } = renderHook(() => useRutinasActivas());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.rutinas).toEqual(mockRutinas);
    });

    it('should handle storage errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      vi.spyOn(storage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));

      const { result } = renderHook(() => useRutinasActivas());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.rutinas).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading rutinas activas:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('useRutinasHoy', () => {
    it('should initialize with empty rutinas', async () => {
      const { result } = renderHook(() => useRutinasHoy());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.rutinas).toEqual([]);
    });

    it('should add a rutina', async () => {
      const { result } = renderHook(() => useRutinasHoy());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newRutina = {
        fecha: '2026-01-11',
        bloqueo: 'energia',
        categoria: 'autocuidado',
        energia: 2,
        hora: '08:00',
        modulos: ['ejercicio', 'meditacion'],
        completada: false,
      };

      await act(async () => {
        await result.current.addRutina(newRutina);
      });

      await waitFor(() => {
        expect(result.current.rutinas).toHaveLength(1);
        expect(result.current.rutinas[0]).toMatchObject(newRutina);
      });
    });

    it('should persist rutinas to storage', async () => {
      const { result } = renderHook(() => useRutinasHoy());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newRutina = {
        fecha: '2026-01-11',
        bloqueo: 'ansiedad',
        categoria: 'trabajo',
        energia: 3,
        hora: '09:00',
        modulos: ['planificacion'],
        completada: false,
      };

      await act(async () => {
        await result.current.addRutina(newRutina);
      });

      // Verify storage was updated
      const stored = await storage.getItem('rutinasHoy');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toMatchObject(newRutina);
    });
  });

  describe('useLogrosRutina', () => {
    it('should initialize with empty logros', async () => {
      const { result } = renderHook(() => useLogrosRutina());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.logros).toEqual([]);
    });

    it('should add a logro', async () => {
      const { result } = renderHook(() => useLogrosRutina());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newLogro = {
        fecha: '2026-01-11T12:00:00.000Z',
        mensaje: 'Completé mi rutina!',
      };

      await act(async () => {
        await result.current.addLogro(newLogro);
      });

      await waitFor(() => {
        expect(result.current.logros).toHaveLength(1);
        expect(result.current.logros[0]).toMatchObject(newLogro);
      });
    });

    it('should persist logros to storage', async () => {
      const { result } = renderHook(() => useLogrosRutina());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newLogro = {
        fecha: '2026-01-11T12:00:00.000Z',
        mensaje: 'Gran trabajo hoy!',
      };

      await act(async () => {
        await result.current.addLogro(newLogro);
      });

      const stored = await storage.getItem('logrosRutina');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toMatchObject(newLogro);
    });
  });

  describe('usePensamientosBloqueantes', () => {
    it('should initialize with null pensamiento', async () => {
      const { result } = renderHook(() => usePensamientosBloqueantes());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.pensamiento).toBeNull();
    });

    it('should save encrypted pensamiento', async () => {
      const { result } = renderHook(() => usePensamientosBloqueantes());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const encrypted = 'U2FsdGVkX1+abc123==';

      await act(async () => {
        await result.current.savePensamiento(encrypted);
      });

      await waitFor(() => {
        expect(result.current.pensamiento).toBe(encrypted);
      });
    });

    it('should persist pensamiento to storage', async () => {
      const { result } = renderHook(() => usePensamientosBloqueantes());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const encrypted = 'U2FsdGVkX1+xyz789==';

      await act(async () => {
        await result.current.savePensamiento(encrypted);
      });

      const stored = await storage.getItem('encryptedThoughts');
      expect(stored).toBe(encrypted);
    });

    it('should load existing pensamiento', async () => {
      const encrypted = 'U2FsdGVkX1+existing==';
      await storage.setItem('encryptedThoughts', encrypted);

      const { result } = renderHook(() => usePensamientosBloqueantes());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.pensamiento).toBe(encrypted);
    });
  });
});
