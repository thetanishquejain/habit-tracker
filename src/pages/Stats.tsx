import { useMemo, useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import {
  calculateOverallStats,
  calculateActiveDays,
} from '../utils/statsCalculator';
import { calculateLongestStreak } from '../utils/streakCalculator';
import { StatCard } from '../components/stats/StatCard';
import { CompletionChart } from '../components/stats/CompletionChart';
import { HeatmapCalendar } from '../components/stats/HeatmapCalendar';
import { CategoryBreakdown } from '../components/stats/CategoryBreakdown';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { StatCardSkeleton } from '../components/ui/Skeleton';

const RANGES = [30, 60, 90] as const;

export const Stats = () => {
  const { habits, logs, loading } = useHabits();
  const [range, setRange] = useState<number>(30);

  const overall = useMemo(
    () => calculateOverallStats(habits, logs, range),
    [habits, logs, range],
  );
  const activeDays = useMemo(
    () => calculateActiveDays(logs, range),
    [logs, range],
  );
  const longestStreak = useMemo(() => {
    return habits.reduce((max, h) => {
      const s = calculateLongestStreak(logs.filter((l) => l.habitId === h.id));
      return Math.max(max, s);
    }, 0);
  }, [habits, logs]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <EmptyState
        icon="📊"
        title="No stats to show yet"
        message="Add a few habits and check in for a couple of days — your progress will appear here."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Stats</h1>
        <Select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="max-w-[10rem]"
        >
          {RANGES.map((r) => (
            <option key={r} value={r}>
              Last {r} days
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total habits" value={overall.totalHabits} />
        <StatCard label="Total check-ins" value={overall.totalCompletions} />
        <StatCard
          label={`Avg completion (${range}d)`}
          value={`${overall.avgCompletionRate}%`}
        />
        <StatCard label="Longest streak" value={`${longestStreak} days`} />
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Check-ins over time
          </h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {activeDays} active days
          </span>
        </div>
        <CompletionChart logs={logs} days={range} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
            By category
          </h2>
          <CategoryBreakdown habits={habits} logs={logs} />
        </Card>
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
            Activity heatmap
          </h2>
          <HeatmapCalendar logs={logs} />
          {overall.bestHabit && (
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Best performer:{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {overall.bestHabit.name}
              </span>{' '}
              ({overall.bestHabit.completionRate}%)
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};
