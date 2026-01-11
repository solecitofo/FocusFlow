/**
 * Centralized storage utility with IndexedDB primary and localStorage fallback
 * Unifies data persistence across the application
 */

const DB_NAME = 'FocusFlowDB';
const DB_VERSION = 1;
const STORE_NAME = 'appData';

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Initialize IndexedDB
 */
function initDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });

  return dbPromise;
}

/**
 * Get value from IndexedDB or localStorage
 */
export async function getItem(key: string): Promise<string | null> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    // Fallback to localStorage
    console.warn('IndexedDB failed, using localStorage:', error);
    return localStorage.getItem(key);
  }
}

/**
 * Set value in IndexedDB or localStorage
 */
export async function setItem(key: string, value: string): Promise<void> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(value, key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    // Fallback to localStorage
    console.warn('IndexedDB failed, using localStorage:', error);
    localStorage.setItem(key, value);
  }
}

/**
 * Remove value from IndexedDB or localStorage
 */
export async function removeItem(key: string): Promise<void> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    // Fallback to localStorage
    console.warn('IndexedDB failed, using localStorage:', error);
    localStorage.removeItem(key);
  }
}

/**
 * Clear all data from IndexedDB or localStorage
 */
export async function clear(): Promise<void> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    // Fallback to localStorage
    console.warn('IndexedDB failed, using localStorage:', error);
    localStorage.clear();
  }
}

/**
 * Get all keys from IndexedDB or localStorage
 */
export async function getAllKeys(): Promise<string[]> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAllKeys();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as string[]);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    // Fallback to localStorage
    console.warn('IndexedDB failed, using localStorage:', error);
    return Object.keys(localStorage);
  }
}

/**
 * Storage interface for compatibility with existing code
 */
export const storage = {
  get: async (key: string) => ({ value: await getItem(key) }),
  set: setItem,
  remove: removeItem,
  clear,
  getAllKeys,
};
