import { NavLink } from 'react-router';

import ErrorButton from '../components/ErrorButton.tsx';

export default function Navigation() {
  return (
    <nav className="absolute my-2.5 gap-1 flex flex-col text-center">
      <NavLink
        to="search"
        className={({ isActive }) => {
          return `p-2 bg-mist-800 ${isActive ? 'text-gray-50' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30`;
        }}
      >
        Search
      </NavLink>
      <NavLink
        to="about"
        className={({ isActive }) => {
          return `p-2 bg-mist-800 ${isActive ? 'text-gray-50' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30`;
        }}
      >
        About
      </NavLink>
      <ErrorButton />
    </nav>
  );
}
