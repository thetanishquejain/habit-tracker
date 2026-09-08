import { useMemo, useState } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { formatDisplayDateWithDay, getRelativeTimeString } from '../../utils/dateUtils';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';
import { EmptyState } from '../ui/EmptyState';

const PAGE = 10;

interface RowProps {
  habitId: string;
  date: string;
  note: string;
}

const JournalRow = ({ habitId, date, note }: RowProps) => {
  const { setNote } = useHabits();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await setNote(habitId, date, draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <li className="py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {formatDisplayDateWithDay(date)}
        </span>
        <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
          {getRelativeTimeString(date)}
        </span>
      </div>

      {editing ? (
        <div className="mt-2 space-y-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            autoFocus
            placeholder="How did it go?"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={save} disabled={saving}>
              Save
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setDraft(note);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : note ? (
        <button
          onClick={() => setEditing(true)}
          className="mt-1 block w-full text-left text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          {note}
        </button>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          + Add a note
        </button>
      )}
    </li>
  );
};

export const HabitJournal = ({ habitId }: { habitId: string }) => {
  const { logsForHabit } = useHabits();
  const [limit, setLimit] = useState(PAGE);

  const entries = useMemo(
    () =>
      logsForHabit(habitId)
        .slice()
        .sort((a, b) => b.completedDate.localeCompare(a.completedDate)),
    [logsForHabit, habitId],
  );

  if (entries.length === 0) {
    return (
      <EmptyState
        title="No entries yet"
        message="Check in on a day to add a note about how it went."
      />
    );
  }

  const shown = entries.slice(0, limit);

  return (
    <div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {shown.map((log) => (
          <JournalRow
            key={log.id}
            habitId={habitId}
            date={log.completedDate}
            note={log.notes ?? ''}
          />
        ))}
      </ul>
      {limit < entries.length && (
        <button
          onClick={() => setLimit((l) => l + PAGE)}
          className="mt-3 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Show older ({entries.length - limit})
        </button>
      )}
    </div>
  );
};
