import { NavLink } from 'react-router';
import ErrorButton from '../components/ErrorButton.tsx';
import { NAVIGATION } from '@/constants/routes.ts';

export default function Navigation() {
  return (
    <nav className="absolute my-2.5 gap-1 flex flex-col text-center fade-in">
      <NavLink
        to={NAVIGATION.SEARCH.BASE}
        className={({ isActive }) => {
          return `p-2 bg-mist-800 ${isActive ? 'text-gray-50  pointer-events-none' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30 transition-colors duration-400`;
        }}
      >
        Search
      </NavLink>
      <NavLink
        to={NAVIGATION.ABOUT}
        className={({ isActive }) => {
          return `p-2 bg-mist-800 ${isActive ? 'text-gray-50  pointer-events-none' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30 transition-colors duration-400`;
        }}
      >
        About
      </NavLink>
      <ErrorButton />
    </nav>
  );
}
