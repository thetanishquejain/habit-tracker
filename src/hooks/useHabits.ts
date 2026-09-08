import { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import type { HabitContextType } from '../context/HabitContext';

/** Access the habit store. Must be used within <HabitProvider>. */
export const useHabits = (): HabitContextType => {
  const ctx = useContext(HabitContext);
  if (!ctx) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return ctx;
};
