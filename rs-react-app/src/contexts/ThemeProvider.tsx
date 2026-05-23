import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(true);
  function toggle() {
    setIsDark((prev) => !prev);
  }

  useEffect(() => {
    if (!isDark) {
      document.documentElement.classList.add('light');
    }
    if (isDark) {
      document.documentElement.classList.remove('light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
