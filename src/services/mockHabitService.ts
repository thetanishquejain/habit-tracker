import type { Habit, HabitLog, HabitStats } from '../types';
import { mockHabits } from '../data/mockHabits';
import { mockLogs } from '../data/mockLogs';

// LocalStorage keys
const HABITS_KEY = 'habit-tracker-habits';
const LOGS_KEY = 'habit-tracker-logs';

// Simulated API delay (in ms)
const API_DELAY = 300;

// Helper to simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(HABITS_KEY)) {
    localStorage.setItem(HABITS_KEY, JSON.stringify(mockHabits));
  }
  if (!localStorage.getItem(LOGS_KEY)) {
    localStorage.setItem(LOGS_KEY, JSON.stringify(mockLogs));
  }
};

// Get all habits from localStorage
const getStoredHabits = (): Habit[] => {
  initializeStorage();
  const stored = localStorage.getItem(HABITS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Get all logs from localStorage
const getStoredLogs = (): HabitLog[] => {
  initializeStorage();
  const stored = localStorage.getItem(LOGS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save habits to localStorage
const saveHabits = (habits: Habit[]): void => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
};

// Save logs to localStorage
const saveLogs = (logs: HabitLog[]): void => {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ============ Habit CRUD Operations ============

export const getHabits = async (): Promise<Habit[]> => {
  await delay(API_DELAY);
  const habits = getStoredHabits();
  // Filter out archived habits by default
  return habits.filter(h => !h.archivedAt);
};

export const getHabit = async (id: string): Promise<Habit | null> => {
  await delay(API_DELAY);
  const habits = getStoredHabits();
  return habits.find(h => h.id === id) || null;
};

export const createHabit = async (
  habitData: Omit<Habit, 'id' | 'createdAt'>
): Promise<Habit> => {
  await delay(API_DELAY);

  const newHabit: Habit = {
    ...habitData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  const habits = getStoredHabits();
  habits.push(newHabit);
  saveHabits(habits);

  return newHabit;
};

export const updateHabit = async (
  id: string,
  updates: Partial<Omit<Habit, 'id' | 'createdAt'>>
): Promise<Habit> => {
  await delay(API_DELAY);

  const habits = getStoredHabits();
  const index = habits.findIndex(h => h.id === id);

  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }

  const updatedHabit = {
    ...habits[index],
    ...updates,
  };

  habits[index] = updatedHabit;
  saveHabits(habits);

  return updatedHabit;
};

export const deleteHabit = async (id: string): Promise<void> => {
  await delay(API_DELAY);

  const habits = getStoredHabits();
  const filtered = habits.filter(h => h.id !== id);
  saveHabits(filtered);

  // Also delete associated logs
  const logs = getStoredLogs();
  const filteredLogs = logs.filter(l => l.habitId !== id);
  saveLogs(filteredLogs);
};

export const archiveHabit = async (id: string): Promise<Habit> => {
  await delay(API_DELAY);

  const habits = getStoredHabits();
  const index = habits.findIndex(h => h.id === id);

  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }

  const archivedHabit = {
    ...habits[index],
    archivedAt: new Date().toISOString(),
  };

  habits[index] = archivedHabit;
  saveHabits(habits);

  return archivedHabit;
};

// ============ Habit Log Operations ============

export const getHabitLogs = async (habitId: string): Promise<HabitLog[]> => {
  await delay(API_DELAY);
  const logs = getStoredLogs();
  return logs.filter(l => l.habitId === habitId);
};

export const getAllLogs = async (): Promise<HabitLog[]> => {
  await delay(API_DELAY);
  return getStoredLogs();
};

export const logCompletion = async (
  habitId: string,
  date: string,
  notes?: string
): Promise<HabitLog> => {
  await delay(API_DELAY);

  const logs = getStoredLogs();

  // Check if log already exists for this habit and date
  const existingIndex = logs.findIndex(
    l => l.habitId === habitId && l.completedDate === date
  );

  if (existingIndex !== -1) {
    // Update existing log
    const updatedLog = {
      ...logs[existingIndex],
      notes,
    };
    logs[existingIndex] = updatedLog;
    saveLogs(logs);
    return updatedLog;
  }

  // Create new log
  const newLog: HabitLog = {
    id: generateId(),
    habitId,
    completedDate: date,
    notes,
    createdAt: new Date().toISOString(),
  };

  logs.push(newLog);
  saveLogs(logs);

  return newLog;
};

export const removeCompletion = async (
  habitId: string,
  date: string
): Promise<void> => {
  await delay(API_DELAY);

  const logs = getStoredLogs();
  const filtered = logs.filter(
    l => !(l.habitId === habitId && l.completedDate === date)
  );
  saveLogs(filtered);
};

// ============ Statistics Operations ============

export const getHabitStats = async (habitId: string): Promise<HabitStats> => {
  await delay(API_DELAY);

  const logs = await getHabitLogs(habitId);
  const sortedLogs = logs
    .map(l => l.completedDate)
    .sort()
    .reverse();

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; ; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    if (sortedLogs.includes(dateStr)) {
      currentStreak++;
    } else if (i > 0) {
      // Allow missing today, but break on first gap after that
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of sortedLogs.reverse()) {
    const currentDate = new Date(dateStr);
    currentDate.setHours(0, 0, 0, 0);

    if (prevDate === null) {
      tempStreak = 1;
    } else {
      const dayDiff = Math.floor(
        (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    prevDate = currentDate;
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // Calculate completion rates
  const calculateRate = (days: number): number => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    const recentLogs = logs.filter(l => l.completedDate >= cutoffStr);
    return Math.round((recentLogs.length / days) * 100);
  };

  return {
    habitId,
    currentStreak,
    longestStreak,
    totalCompletions: logs.length,
    completionRate7Days: calculateRate(7),
    completionRate30Days: calculateRate(30),
    completionRate90Days: calculateRate(90),
  };
};

// ============ Utility Functions ============

export const resetToMockData = async (): Promise<void> => {
  await delay(API_DELAY);
  localStorage.setItem(HABITS_KEY, JSON.stringify(mockHabits));
  localStorage.setItem(LOGS_KEY, JSON.stringify(mockLogs));
};

export const clearAllData = async (): Promise<void> => {
  await delay(API_DELAY);
  localStorage.removeItem(HABITS_KEY);
  localStorage.removeItem(LOGS_KEY);
};

export const exportData = async (): Promise<{ habits: Habit[]; logs: HabitLog[] }> => {
  await delay(API_DELAY);
  return {
    habits: getStoredHabits(),
    logs: getStoredLogs(),
  };
};

export const importData = async (data: {
  habits: Habit[];
  logs: HabitLog[];
}): Promise<void> => {
  await delay(API_DELAY);
  saveHabits(data.habits);
  saveLogs(data.logs);
};
