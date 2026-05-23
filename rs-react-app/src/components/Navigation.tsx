import { NavLink } from 'react-router';

import ErrorButton from '../components/ErrorButton.tsx';
import ThemeButton from './ThemeButton.tsx';
import Cart from './Cart.tsx';

export default function Navigation() {
  return (
    <nav className="fixed h-[98vh] flex flex-col justify-between gap-1 max-w-30 py-[2vh] text-center fade-in">
      <div className="flex flex-col gap-1 fade-in">
        <NavLink
          to="search"
          className={({ isActive }) => {
            return `p-2 bg-mist-800 ${isActive ? 'text-gray-50  pointer-events-none' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30 transition-colors duration-400`;
          }}
        >
          Search
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => {
            return `p-2 bg-mist-800 ${isActive ? 'text-gray-50  pointer-events-none' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30 transition-colors duration-400`;
          }}
        >
          About
        </NavLink>
        <ErrorButton />
        <ThemeButton />
      </div>
      <Cart />
    </nav>
  );
}
