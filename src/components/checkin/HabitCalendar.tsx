import { useMemo, useState } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { getToday, formatDate } from '../../utils/dateUtils';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const HabitCalendar = ({ habitId }: { habitId: string }) => {
  const { isCompletedOn, toggleCompletion, logsForHabit } = useHabits();
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const today = getToday();

  const datesWithNotes = useMemo(() => {
    const set = new Set<string>();
    for (const l of logsForHabit(habitId)) {
      if (l.notes && l.notes.trim()) set.add(l.completedDate);
    }
    return set;
  }, [logsForHabit, habitId]);

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const leading = first.getDay();
    const out: (string | null)[] = [];
    for (let i = 0; i < leading; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      out.push(formatDate(new Date(view.year, view.month, d)));
    }
    return out;
  }, [view]);

  const shift = (delta: number) => {
    setView((v) => {
      const m = v.month + delta;
      return {
        year: v.year + Math.floor(m / 12),
        month: ((m % 12) + 12) % 12,
      };
    });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => shift(-1)}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {MONTHS[view.month]} {view.year}
        </span>
        <button
          onClick={() => shift(1)}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="pb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
            {d}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const done = isCompletedOn(habitId, date);
          const isFuture = date > today;
          const hasNote = datesWithNotes.has(date);
          const day = Number(date.slice(-2));
          return (
            <button
              key={i}
              disabled={isFuture}
              onClick={() => toggleCompletion(habitId, date)}
              title={hasNote ? 'Has a note' : undefined}
              className={`relative aspect-square rounded-md text-xs font-medium transition-colors ${
                isFuture
                  ? 'cursor-not-allowed text-gray-300 dark:text-gray-700'
                  : done
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              } ${date === today ? 'ring-2 ring-indigo-400' : ''}`}
            >
              {day}
              {hasNote && (
                <span
                  className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                    done ? 'bg-white' : 'bg-indigo-400'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        Tap a day to check in or undo. Notes are added in the journal below.
      </p>
    </div>
  );
};
