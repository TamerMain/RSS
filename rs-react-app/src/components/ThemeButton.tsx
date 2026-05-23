import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function ThemeButton() {
  const context = useContext(ThemeContext);

  return (
    <button
      onClick={() => context.toggle()}
      className={`relative m-auto w-16 h-8 ${context.isDark ? 'bg-mist-50' : 'bg-mist-800'} transition-colors duration-500`}
    >
      <span
        className={`absolute top-1 w-6 h-6 bg-mist-400 shadow-md 'bg-mist-800' 'light:bg-mist-400' transition-transform transition-colors ${
          context.isDark ? '-translate-x-0' : '-translate-x-6'
        }`}
      />
    </button>
  );
}

export default ThemeButton;
