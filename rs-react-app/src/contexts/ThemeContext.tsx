import { useState, useEffect, createContext, type ReactNode } from 'react';

type ThemeContext = { isDark: boolean; toggle: () => void };

export const ThemeContext = createContext<ThemeContext>({
  isDark: true,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(true);
  function toggle() {
    setIsDark((prev) => !prev);
  }

  useEffect(() => {
    !isDark && document.documentElement.classList.add('light');
    isDark && document.documentElement.classList.remove('light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
