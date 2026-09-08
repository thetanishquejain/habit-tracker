import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const linkBase = 'rounded-lg px-3 py-2 text-sm font-medium transition-colors';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
  }`;

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
    <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
      <NavLink to="/" className="flex items-center gap-2">
        <span className="text-xl">✅</span>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Habit Tracker
        </span>
      </NavLink>
      <nav className="flex items-center gap-1">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/stats" className={linkClass}>
          Stats
        </NavLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
);
