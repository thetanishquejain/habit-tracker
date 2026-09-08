import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { Habit, HabitLog, Category } from '../types';
import * as api from '../services/mockHabitService';
import { getToday } from '../utils/dateUtils';
import { calculateCurrentStreak } from '../utils/streakCalculator';
import { celebrate, isMilestone } from '../lib/confetti';
import { COINS_PER_CHECKIN } from '../utils/rewards';

export type SortOption = 'name' | 'streak' | 'created';

export interface HabitContextType {
  habits: Habit[];
  logs: HabitLog[];
  loading: boolean;
  error: string | null;

  // derived / filter state
  categoryFilter: Category | 'All';
  setCategoryFilter: (c: Category | 'All') => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  search: string;
  setSearch: (s: string) => void;

  // data helpers
  logsForHabit: (habitId: string) => HabitLog[];
  isCompletedOn: (habitId: string, date: string) => boolean;

  // actions
  refresh: () => Promise<void>;
  addHabit: (data: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  editHabit: (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt'>>) => Promise<void>;
  removeHabit: (id: string) => Promise<void>;
  toggleCompletion: (habitId: string, date?: string) => Promise<void>;
  setNote: (habitId: string, date: string, notes: string) => Promise<void>;
  resetData: () => Promise<void>;
  clearData: () => Promise<void>;
  importData: (data: { habits: Habit[]; logs: HabitLog[] }) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('created');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [h, l] = await Promise.all([api.getHabits(), api.getAllLogs()]);
      setHabits(h);
      setLogs(l);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const logsForHabit = useCallback(
    (habitId: string) => logs.filter((l) => l.habitId === habitId),
    [logs],
  );

  const isCompletedOn = useCallback(
    (habitId: string, date: string) =>
      logs.some((l) => l.habitId === habitId && l.completedDate === date),
    [logs],
  );

  const addHabit = useCallback(async (data: Omit<Habit, 'id' | 'createdAt'>) => {
    try {
      const created = await api.createHabit(data);
      setHabits((prev) => [...prev, created]);
      toast.success('Habit created!');
    } catch {
      toast.error('Could not create habit');
    }
  }, []);

  const editHabit = useCallback(
    async (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt'>>) => {
      try {
        const updated = await api.updateHabit(id, updates);
        setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
        toast.success('Habit updated!');
      } catch {
        toast.error('Could not update habit');
      }
    },
    [],
  );

  const removeHabit = useCallback(async (id: string) => {
    try {
      await api.deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setLogs((prev) => prev.filter((l) => l.habitId !== id));
      toast.success('Habit deleted');
    } catch {
      toast.error('Could not delete habit');
    }
  }, []);

  const toggleCompletion = useCallback(
    async (habitId: string, date: string = getToday()) => {
      const already = logs.some(
        (l) => l.habitId === habitId && l.completedDate === date,
      );
      try {
        if (already) {
          await api.removeCompletion(habitId, date);
          setLogs((prev) =>
            prev.filter(
              (l) => !(l.habitId === habitId && l.completedDate === date),
            ),
          );
        } else {
          const log = await api.logCompletion(habitId, date);
          setLogs((prev) => {
            const next = [...prev, log];
            const streak = calculateCurrentStreak(
              next.filter((l) => l.habitId === habitId),
            );
            if (isMilestone(streak)) {
              celebrate();
              toast.success(`${streak}-day streak! Keep it going`);
            } else {
              toast.success(`+${COINS_PER_CHECKIN} coins`, { icon: '🪙' });
            }
            return next;
          });
        }
      } catch {
        toast.error('Could not update check-in');
      }
    },
    [logs],
  );

  const setNote = useCallback(
    async (habitId: string, date: string, notes: string) => {
      try {
        const log = await api.logCompletion(habitId, date, notes);
        setLogs((prev) => {
          const exists = prev.some(
            (l) => l.habitId === habitId && l.completedDate === date,
          );
          return exists
            ? prev.map((l) =>
                l.habitId === habitId && l.completedDate === date ? log : l,
              )
            : [...prev, log];
        });
        toast.success(notes.trim() ? 'Note saved' : 'Note cleared');
      } catch {
        toast.error('Could not save note');
      }
    },
    [],
  );

  const resetData = useCallback(async () => {
    await api.resetToMockData();
    await load();
    toast.success('Demo data restored');
  }, [load]);

  const clearData = useCallback(async () => {
    await api.clearAllData();
    setHabits([]);
    setLogs([]);
    toast.success('All data cleared');
  }, []);

  const importData = useCallback(
    async (data: { habits: Habit[]; logs: HabitLog[] }) => {
      await api.importData(data);
      await load();
      toast.success('Data imported');
    },
    [load],
  );

  const value = useMemo<HabitContextType>(
    () => ({
      habits,
      logs,
      loading,
      error,
      categoryFilter,
      setCategoryFilter,
      sort,
      setSort,
      search,
      setSearch,
      logsForHabit,
      isCompletedOn,
      refresh: load,
      addHabit,
      editHabit,
      removeHabit,
      toggleCompletion,
      setNote,
      resetData,
      clearData,
      importData,
    }),
    [
      habits,
      logs,
      loading,
      error,
      categoryFilter,
      sort,
      search,
      logsForHabit,
      isCompletedOn,
      load,
      addHabit,
      editHabit,
      removeHabit,
      toggleCompletion,
      setNote,
      resetData,
      clearData,
      importData,
    ],
  );

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};
