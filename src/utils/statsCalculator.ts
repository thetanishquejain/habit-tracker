import type { Habit, HabitLog } from '../types';
import { getDaysAgo, getDayOfWeek, getToday } from './dateUtils';
import { getCompletionCountInRange } from './streakCalculator';
import { calculateAdherenceRate, effectiveTarget } from './frequency';

/**
 * Calculate completion rate for a given number of days
 */
export const calculateCompletionRate = (
  logs: HabitLog[],
  days: number
): number => {
  const startDate = getDaysAgo(days - 1);
  const endDate = getToday();
  const completions = getCompletionCountInRange(logs, startDate, endDate);
  return Math.round((completions / days) * 100);
};

/**
 * Calculate total completions
 */
export const calculateTotalCompletions = (logs: HabitLog[]): number => {
  return logs.length;
};

/**
 * Calculate the best day of the week for completions
 */
export const calculateBestDayOfWeek = (logs: HabitLog[]): {
  dayIndex: number;
  dayName: string;
  count: number;
} => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts = new Array(7).fill(0);

  logs.forEach(log => {
    const dayIndex = getDayOfWeek(log.completedDate);
    dayCounts[dayIndex]++;
  });

  const maxCount = Math.max(...dayCounts);
  const bestDayIndex = dayCounts.indexOf(maxCount);

  return {
    dayIndex: bestDayIndex,
    dayName: dayNames[bestDayIndex],
    count: maxCount,
  };
};

/**
 * Calculate completions by day of week
 */
export const calculateCompletionsByDayOfWeek = (logs: HabitLog[]): {
  day: string;
  count: number;
}[] => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts = new Array(7).fill(0);

  logs.forEach(log => {
    const dayIndex = getDayOfWeek(log.completedDate);
    dayCounts[dayIndex]++;
  });

  return dayNames.map((day, index) => ({
    day,
    count: dayCounts[index],
  }));
};

/**
 * Calculate average completions per week
 */
export const calculateAverageCompletionsPerWeek = (logs: HabitLog[]): number => {
  if (logs.length === 0) return 0;

  const sortedDates = logs.map(log => log.completedDate).sort();
  const firstDate = new Date(sortedDates[0]);
  const lastDate = new Date(sortedDates[sortedDates.length - 1]);

  const daysDiff = Math.floor(
    (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeks = Math.max(daysDiff / 7, 1);

  return Math.round((logs.length / weeks) * 10) / 10;
};

/**
 * Get completions for a specific time period
 */
export interface CompletionsByPeriod {
  date: string;
  count: number;
}

export const getCompletionsByDate = (
  logs: HabitLog[],
  startDate: string,
  endDate: string
): CompletionsByPeriod[] => {
  const completionsMap = new Map<string, number>();

  logs.forEach(log => {
    if (log.completedDate >= startDate && log.completedDate <= endDate) {
      const count = completionsMap.get(log.completedDate) || 0;
      completionsMap.set(log.completedDate, count + 1);
    }
  });

  const result: CompletionsByPeriod[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      count: completionsMap.get(dateStr) || 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
};

/**
 * Calculate overall statistics for all habits
 */
export interface OverallStats {
  totalHabits: number;
  activeHabits: number;
  totalCompletions: number;
  avgCompletionRate: number;
  bestHabit: {
    name: string;
    completionRate: number;
  } | null;
}

export const calculateOverallStats = (
  habits: Habit[],
  allLogs: HabitLog[],
  days: number = 30
): OverallStats => {
  const activeHabits = habits.filter(h => !h.archivedAt);

  const habitStats = activeHabits.map(habit => {
    const habitLogs = allLogs.filter(log => log.habitId === habit.id);
    return {
      name: habit.name,
      // Normalised to each habit's weekly target so a "3x per week" habit
      // hitting its target reads as 100%, not 43%.
      completionRate: calculateAdherenceRate(
        habitLogs,
        days,
        effectiveTarget(habit)
      ),
    };
  });

  const totalCompletionRate = habitStats.reduce(
    (sum, stat) => sum + stat.completionRate,
    0
  );
  const avgCompletionRate = activeHabits.length > 0
    ? Math.round(totalCompletionRate / activeHabits.length)
    : 0;

  const bestHabit = habitStats.length > 0
    ? habitStats.reduce((best, current) =>
        current.completionRate > best.completionRate ? current : best
      )
    : null;

  return {
    totalHabits: habits.length,
    activeHabits: activeHabits.length,
    totalCompletions: allLogs.length,
    avgCompletionRate,
    bestHabit,
  };
};

/**
 * Calculate completions by category
 */
export interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
}

export const calculateCompletionsByCategory = (
  habits: Habit[],
  allLogs: HabitLog[]
): CategoryStats[] => {
  const categoryMap = new Map<string, number>();

  habits.forEach(habit => {
    const habitLogs = allLogs.filter(log => log.habitId === habit.id);
    const currentCount = categoryMap.get(habit.category) || 0;
    categoryMap.set(habit.category, currentCount + habitLogs.length);
  });

  const total = allLogs.length;
  const result: CategoryStats[] = [];

  categoryMap.forEach((count, category) => {
    result.push({
      category,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    });
  });

  return result.sort((a, b) => b.count - a.count);
};

/**
 * Calculate active days (days with at least one completion)
 */
export const calculateActiveDays = (logs: HabitLog[], days: number): number => {
  const startDate = getDaysAgo(days - 1);
  const endDate = getToday();

  const uniqueDates = new Set(
    logs
      .filter(log => log.completedDate >= startDate && log.completedDate <= endDate)
      .map(log => log.completedDate)
  );

  return uniqueDates.size;
};

/**
 * Calculate consistency score (0-100)
 * Based on how evenly distributed completions are over time
 */
export const calculateConsistencyScore = (logs: HabitLog[], days: number = 30): number => {
  if (logs.length === 0) return 0;

  const startDate = getDaysAgo(days - 1);
  const completionsByDate = getCompletionsByDate(logs, startDate, getToday());

  // Calculate variance in completions
  const completionsPerDay = completionsByDate.map(d => d.count);
  const mean = completionsPerDay.reduce((sum, count) => sum + count, 0) / days;

  if (mean === 0) return 0;

  const variance = completionsPerDay.reduce(
    (sum, count) => sum + Math.pow(count - mean, 2),
    0
  ) / days;

  // Convert variance to a 0-100 consistency score
  // Lower variance = higher consistency
  const maxVariance = mean * mean; // Theoretical maximum
  const consistencyRatio = variance > 0 ? 1 - Math.min(variance / maxVariance, 1) : 1;

  return Math.round(consistencyRatio * 100);
};
