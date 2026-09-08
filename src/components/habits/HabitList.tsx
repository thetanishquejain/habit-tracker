import type { Habit } from '../../types';
import { HabitCard } from './HabitCard';

export const HabitList = ({ habits }: { habits: Habit[] }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {habits.map((h) => (
      <HabitCard key={h.id} habit={h} />
    ))}
  </div>
);
