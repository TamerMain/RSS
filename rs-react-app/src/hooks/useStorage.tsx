import { useCallback } from 'react';

type StorageKey = 'RecentSearch';

export default function useStorage(key: StorageKey) {
  const getItem = useCallback(() => {
    const item = localStorage.getItem(key);
    if (item === null) {
      localStorage.setItem(key, '');
      return '';
    } else {
      return item;
    }
  }, [key]);
  const setItem = useCallback(
    (value: string) => {
      const item = localStorage.getItem(key);
      if (value !== item) {
        localStorage.setItem(key, value);
      }
    },
    [key]
  );

  return { getItem, setItem };
}
