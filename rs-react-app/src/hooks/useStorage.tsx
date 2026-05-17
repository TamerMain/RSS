import { useCallback } from 'react';

export default function useStorage(key: string) {
  const getItem = useCallback(() => {
    const item = localStorage.getItem(key);
    if (item === null) {
      localStorage.setItem(key, '');
      return '';
    } else {
      return item;
    }
  }, [key]);
    const setItem = useCallback((value: string): boolean => {
    const item = localStorage.getItem(key);
    if (value !== item) {
      localStorage.setItem(key, value);
      return true;
    } else {
      return false;
    }
  }, [key]);

  return { getItem, setItem };
}
