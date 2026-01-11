import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getItem, setItem, removeItem, clear, getAllKeys } from '../utils/storage';

describe('Storage Utility', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('setItem and getItem', () => {
    it('should store and retrieve a value', async () => {
      const key = 'test-key';
      const value = 'test-value';

      await setItem(key, value);
      const retrieved = await getItem(key);

      expect(retrieved).toBe(value);
    });

    it('should return null for non-existent key', async () => {
      const retrieved = await getItem('non-existent');
      expect(retrieved).toBeNull();
    });

    it('should handle JSON data', async () => {
      const key = 'json-key';
      const data = { name: 'test', count: 42 };
      const value = JSON.stringify(data);

      await setItem(key, value);
      const retrieved = await getItem(key);

      expect(retrieved).toBe(value);
      expect(JSON.parse(retrieved!)).toEqual(data);
    });

    it('should overwrite existing value', async () => {
      const key = 'overwrite-key';
      
      await setItem(key, 'first');
      await setItem(key, 'second');
      const retrieved = await getItem(key);

      expect(retrieved).toBe('second');
    });
  });

  describe('removeItem', () => {
    it('should remove an item', async () => {
      const key = 'remove-key';

      await setItem(key, 'value');
      await removeItem(key);
      const retrieved = await getItem(key);

      expect(retrieved).toBeNull();
    });

    it('should not throw when removing non-existent key', async () => {
      await expect(removeItem('non-existent')).resolves.not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all items', async () => {
      await setItem('key1', 'value1');
      await setItem('key2', 'value2');
      await setItem('key3', 'value3');

      await clear();

      const val1 = await getItem('key1');
      const val2 = await getItem('key2');
      const val3 = await getItem('key3');

      expect(val1).toBeNull();
      expect(val2).toBeNull();
      expect(val3).toBeNull();
    });
  });

  describe('getAllKeys', () => {
    it('should return all stored keys', async () => {
      await setItem('key1', 'value1');
      await setItem('key2', 'value2');
      await setItem('key3', 'value3');

      const keys = await getAllKeys();

      expect(keys).toHaveLength(3);
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
    });

    it('should return empty array when no keys', async () => {
      const keys = await getAllKeys();
      expect(keys).toHaveLength(0);
    });
  });
});
