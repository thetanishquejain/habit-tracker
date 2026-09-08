import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useRewards } from '../../hooks/useRewards';
import { CoinBalance } from '../rewards/CoinBalance';

const linkBase = 'rounded-lg px-3 py-2 text-sm font-medium transition-colors';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
  }`;

export const Header = () => {
  const { balance } = useRewards();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span className="hidden text-lg font-bold text-gray-900 sm:inline dark:text-gray-100">
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
          <NavLink to="/rewards" className={linkClass}>
            Rewards
          </NavLink>
          <NavLink
            to="/rewards"
            className="ml-1 hidden rounded-full bg-amber-50 px-2.5 py-1 sm:flex dark:bg-amber-500/10"
            aria-label="Coin balance"
          >
            <CoinBalance balance={balance} size="sm" />
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
