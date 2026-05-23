import { useState, createContext, type ReactNode } from 'react';

type ThemeContext = { isDark: boolean; toggle: () => void };

export const ThemeContext = createContext<ThemeContext>({
  isDark: true,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  function toggle() {
    setIsDark((prev) => !prev);
    !isDark && document.documentElement.classList.add('light');
    isDark && document.documentElement.classList.remove('light');
  }
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
