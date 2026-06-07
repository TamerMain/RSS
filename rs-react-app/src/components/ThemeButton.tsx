import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function ThemeButton() {
  const context = useContext(ThemeContext);

  return (
    <button
      aria-label="Change Theme"
      onClick={() => context.toggle()}
      className={`relative m-auto w-16 h-8 border-2 border-transparent light:border-mist-800 ${context.isDark ? 'bg-mist-800' : 'bg-mist-50'} transition-colors duration-800`}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 bg-mist-400 shadow-md bg-mist-400 light:bg-mist-800 transition-transform transition-colors duration-800 ${
          context.isDark ? '-translate-x-0' : '-translate-x-6'
        }`}
      />
    </button>
  );
}

export default ThemeButton;
