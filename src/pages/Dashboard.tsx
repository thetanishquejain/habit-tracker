import { useMemo, useState } from 'react';
import type { SortOption } from '../context/HabitContext';
import { useHabits } from '../hooks/useHabits';
import { getToday } from '../utils/dateUtils';
import { calculateCurrentStreak } from '../utils/streakCalculator';
import { HabitList } from '../components/habits/HabitList';
import { CategoryFilter } from '../components/habits/CategoryFilter';
import { CreateHabitModal } from '../components/habits/CreateHabitModal';
import { DataManagement } from '../components/data/DataManagement';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { ProgressBar } from '../components/ui/ProgressBar';
import { HabitCardSkeleton } from '../components/ui/Skeleton';

export const Dashboard = () => {
  const {
    habits,
    logs,
    loading,
    categoryFilter,
    sort,
    setSort,
    search,
    setSearch,
    logsForHabit,
    isCompletedOn,
  } = useHabits();
  const [creating, setCreating] = useState(false);
  const today = getToday();

  const visible = useMemo(() => {
    let list = [...habits];
    if (categoryFilter !== 'All') {
      list = list.filter((h) => h.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((h) => h.name.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'created')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (
        calculateCurrentStreak(logsForHabit(b.id)) -
        calculateCurrentStreak(logsForHabit(a.id))
      );
    });
    return list;
  }, [habits, categoryFilter, search, sort, logsForHabit]);

  const doneToday = habits.filter((h) => isCompletedOn(h.id, today)).length;
  const pct = habits.length ? (doneToday / habits.length) * 100 : 0;
  const allDone = habits.length > 0 && doneToday === habits.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {habits.length} habit{habits.length === 1 ? '' : 's'} · {logs.length}{' '}
            check-ins all time
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>+ New habit</Button>
      </div>

      {habits.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Today
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {doneToday} of {habits.length} done
            </span>
          </div>
          <ProgressBar value={pct} />
          {allDone && (
            <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              🎉 Great job! All habits completed today!
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <CategoryFilter />
        <div className="flex flex-wrap gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search habits…"
            className="max-w-xs"
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="max-w-[10rem]"
          >
            <option value="created">Newest first</option>
            <option value="name">Name (A–Z)</option>
            <option value="streak">Streak (high–low)</option>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <HabitCardSkeleton key={i} />
          ))}
        </div>
      ) : habits.length === 0 ? (
        <EmptyState
          icon="🌱"
          title="No habits yet"
          message="Start building a routine — add your first habit and check in every day."
          action={<Button onClick={() => setCreating(true)}>Create your first habit</Button>}
        />
      ) : visible.length === 0 ? (
        <EmptyState title="No matches" message="Try a different category or search term." />
      ) : (
        <HabitList habits={visible} />
      )}

      <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
        <h2 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          Data
        </h2>
        <DataManagement />
      </div>

      <CreateHabitModal open={creating} onClose={() => setCreating(false)} />
    </div>
  );
};
