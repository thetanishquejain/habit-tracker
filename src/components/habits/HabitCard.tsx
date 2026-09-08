import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Habit } from '../../types';
import { useHabits } from '../../hooks/useHabits';
import { getToday } from '../../utils/dateUtils';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from '../../utils/streakCalculator';
import {
  effectiveTarget,
  isDaily,
  calculateWeeklyStreak,
  completionsInWeek,
} from '../../utils/frequency';
import { getCategoryHexColor } from '../../utils/colorUtils';
import { CategoryBadge } from '../ui/Badge';
import { StreakBadge } from './StreakBadge';
import { FrequencyBadge } from './FrequencyBadge';
import { WeekProgress } from './WeekProgress';
import { CheckinButton } from '../checkin/CheckinButton';
import { EditHabitModal } from './EditHabitModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const HabitCard = ({ habit }: { habit: Habit }) => {
  const navigate = useNavigate();
  const { logsForHabit, isCompletedOn, toggleCompletion } = useHabits();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const logs = logsForHabit(habit.id);
  const daily = isDaily(habit);
  const target = effectiveTarget(habit);
  const doneToday = isCompletedOn(habit.id, getToday());

  const dayStreak = calculateCurrentStreak(logs);
  const dayLongest = calculateLongestStreak(logs);
  const weekStreak = calculateWeeklyStreak(logs, target);
  const thisWeek = completionsInWeek(logs);

  return (
    <>
      <div
        className="group flex flex-col rounded-xl border border-gray-200 border-l-4 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        style={{ borderLeftColor: getCategoryHexColor(habit.category) }}
      >
        <div className="flex items-start justify-between gap-3">
          <button onClick={() => navigate(`/habit/${habit.id}`)} className="text-left">
            <h3 className="font-semibold text-gray-900 hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400">
              {habit.name}
            </h3>
          </button>
          <CheckinButton
            completed={doneToday}
            onToggle={() => toggleCompletion(habit.id)}
          />
        </div>

        {habit.description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {habit.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <CategoryBadge category={habit.category} />
          {daily ? (
            <StreakBadge current={dayStreak} longest={dayLongest} />
          ) : (
            <>
              <FrequencyBadge target={target} />
              <StreakBadge current={weekStreak} unit="week" />
            </>
          )}
        </div>

        {!daily && (
          <div className="mt-3">
            <WeekProgress done={thisWeek} target={target} />
          </div>
        )}

        <div className="mt-4 flex gap-3 text-xs">
          <button
            onClick={() => setEditing(true)}
            className="text-gray-400 opacity-0 transition-opacity hover:text-gray-700 group-hover:opacity-100 dark:hover:text-gray-200"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleting(true)}
            className="text-gray-400 opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100 dark:hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>

      <EditHabitModal habit={habit} open={editing} onClose={() => setEditing(false)} />
      <DeleteConfirmModal habit={habit} open={deleting} onClose={() => setDeleting(false)} />
    </>
  );
};
