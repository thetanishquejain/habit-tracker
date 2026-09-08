import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHabits } from '../hooks/useHabits';
import { getToday } from '../utils/dateUtils';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from '../utils/streakCalculator';
import { calculateTotalCompletions } from '../utils/statsCalculator';
import {
  isDaily,
  effectiveTarget,
  frequencyLabel,
  calculateWeeklyStreak,
  completionsInWeek,
  calculateAdherenceRate,
} from '../utils/frequency';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CategoryBadge } from '../components/ui/Badge';
import { StreakBadge } from '../components/habits/StreakBadge';
import { FrequencyBadge } from '../components/habits/FrequencyBadge';
import { CheckinButton } from '../components/checkin/CheckinButton';
import { HabitCalendar } from '../components/checkin/HabitCalendar';
import { HabitJournal } from '../components/checkin/HabitJournal';
import { CompletionChart } from '../components/stats/CompletionChart';
import { StatCard } from '../components/stats/StatCard';
import { EditHabitModal } from '../components/habits/EditHabitModal';
import { DeleteConfirmModal } from '../components/habits/DeleteConfirmModal';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const HabitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { habits, loading, logsForHabit, isCompletedOn, toggleCompletion } =
    useHabits();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const habit = habits.find((h) => h.id === id);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (!habit) {
    return (
      <EmptyState
        icon="🔍"
        title="Habit not found"
        message="It may have been deleted."
        action={<Button onClick={() => navigate('/')}>Back to dashboard</Button>}
      />
    );
  }

  const logs = logsForHabit(habit.id);
  const daily = isDaily(habit);
  const target = effectiveTarget(habit);
  const doneToday = isCompletedOn(habit.id, getToday());

  const dayStreak = calculateCurrentStreak(logs);
  const dayLongest = calculateLongestStreak(logs);
  const weekStreak = calculateWeeklyStreak(logs, target);
  const thisWeek = completionsInWeek(logs);
  const adherence = calculateAdherenceRate(logs, 30, target);

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Dashboard
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {habit.name}
          </h1>
          {habit.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {habit.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={habit.category} />
            {!daily && <FrequencyBadge target={target} />}
            <StreakBadge
              current={daily ? dayStreak : weekStreak}
              longest={daily ? dayLongest : undefined}
              unit={daily ? 'day' : 'week'}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <CheckinButton
              completed={doneToday}
              onToggle={() => toggleCompletion(habit.id)}
              size={48}
            />
            <span className="text-xs text-gray-400 dark:text-gray-500">Today</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {daily ? (
          <>
            <StatCard label="Current streak" value={`${dayStreak} days`} />
            <StatCard label="Longest streak" value={`${dayLongest} days`} />
          </>
        ) : (
          <>
            <StatCard
              label="This week"
              value={`${thisWeek} / ${target}`}
              hint={frequencyLabel(target)}
            />
            <StatCard label="Week streak" value={`${weekStreak} wk`} />
          </>
        )}
        <StatCard label="Total check-ins" value={calculateTotalCompletions(logs)} />
        <StatCard label="30-day adherence" value={`${adherence}%`} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
            Calendar
          </h2>
          <HabitCalendar habitId={habit.id} />
        </Card>
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
            Last 30 days
          </h2>
          <CompletionChart logs={logs} days={30} />
        </Card>
      </div>

      <Card>
        <h2 className="mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
          Journal
        </h2>
        <p className="mb-3 text-xs text-gray-400 dark:text-gray-500">
          A note for each day you checked in.
        </p>
        <HabitJournal habitId={habit.id} />
      </Card>

      <div className="flex gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button variant="secondary" onClick={() => setEditing(true)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => setDeleting(true)}>
          Delete
        </Button>
      </div>

      <EditHabitModal habit={habit} open={editing} onClose={() => setEditing(false)} />
      <DeleteConfirmModal
        habit={habit}
        open={deleting}
        onClose={() => setDeleting(false)}
        redirectHome
      />
    </div>
  );
};
