'use client';

import { useState, useEffect } from 'react';

type StorageKey = 'RecentSearch';

export default function useStorage(key: StorageKey) {
  const [storedValue, setStoredValue] = useState<string>('');
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const item = localStorage.getItem(key);
    if (item === null) {
      localStorage.setItem(key, '');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStoredValue('');
    } else {
      setStoredValue(item);
    }
    setIsFirstLoad(false);
  }, [key]);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, storedValue);
  }, [key, isFirstLoad, storedValue]);

  return { getItem: storedValue, setItem: setStoredValue, isFirstLoad };
}
