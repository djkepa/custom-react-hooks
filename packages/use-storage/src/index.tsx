import { useState, useEffect } from 'react';

export type StorageType = 'local' | 'session';

/**
 * `useStorage` is a hook for interfacing with web storage APIs (localStorage or sessionStorage).
 * It manages the storing and retrieving of values, with automatic JSON parsing and stringification.
 *
 * @param key - The storage key to use.
 * @param defaultValue - The default value to use if the key is not found in storage.
 * @param storageType - The type of storage to use ('local' for localStorage, 'session' for sessionStorage).
 * @return - The stored value and a setter function for updating the value in storage.
 */

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageType: StorageType = 'local',
): [T, (value: T | ((val: T) => T)) => void] {
  const isSSR = typeof window === 'undefined';
  const storage = isSSR ? null : storageType === 'local' ? localStorage : sessionStorage;

  const getStoredValue = (): T => {
    if (isSSR) return defaultValue;
    try {
      const item = storage?.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading ${storageType}Storage key “${key}”:`, error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  useEffect(() => {
    if (isSSR) return;
    try {
      const valueToStore = JSON.stringify(storedValue);
      storage?.setItem(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting ${storageType}Storage key “${key}”:`, error);
    }
  }, [key, storedValue, storage]);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}

export { useStorage };
