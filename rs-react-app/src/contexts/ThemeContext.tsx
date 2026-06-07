import { createContext } from 'react';

type ThemeContext = { isDark: boolean; toggle: () => void };

export const ThemeContext = createContext<ThemeContext>({
  isDark: true,
  toggle: () => {},
});


