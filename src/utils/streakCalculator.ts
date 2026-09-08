import type { HabitLog } from '../types';
import { formatDate, parseDate, getToday } from './dateUtils';

/**
 * Calculate the current streak for a habit
 * A streak is broken if a day is missed
 */
export const calculateCurrentStreak = (logs: HabitLog[]): number => {
  if (logs.length === 0) return 0;

  // Get sorted completion dates (most recent first)
  const completedDates = logs
    .map(log => log.completedDate)
    .sort()
    .reverse();

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check consecutive days starting from today
  for (let i = 0; ; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = formatDate(checkDate);

    if (completedDates.includes(dateStr)) {
      streak++;
    } else if (i > 0) {
      // Allow missing today (streak continues if yesterday was completed)
      // But break on first gap after that
      break;
    }
  }

  return streak;
};

/**
 * Calculate the longest streak for a habit
 */
export const calculateLongestStreak = (logs: HabitLog[]): number => {
  if (logs.length === 0) return 0;

  // Get sorted completion dates (oldest first)
  const completedDates = logs
    .map(log => log.completedDate)
    .sort();

  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  for (const dateStr of completedDates) {
    const currentDate = parseDate(dateStr);

    if (previousDate === null) {
      // First date
      currentStreak = 1;
    } else {
      // Calculate days between dates
      const dayDiff = Math.floor(
        (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 1) {
        // Consecutive day - increment streak
        currentStreak++;
      } else {
        // Gap in streak - save longest and reset
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }

    previousDate = currentDate;
  }

  // Don't forget to check the final streak
  longestStreak = Math.max(longestStreak, currentStreak);

  return longestStreak;
};

/**
 * Check if a habit was completed on a specific date
 */
export const isCompletedOnDate = (logs: HabitLog[], dateStr: string): boolean => {
  return logs.some(log => log.completedDate === dateStr);
};

/**
 * Check if a habit was completed today
 */
export const isCompletedToday = (logs: HabitLog[]): boolean => {
  return isCompletedOnDate(logs, getToday());
};

/**
 * Get all completion dates for a habit
 */
export const getCompletionDates = (logs: HabitLog[]): string[] => {
  return logs.map(log => log.completedDate).sort();
};

/**
 * Get completion count for a specific date range
 */
export const getCompletionCountInRange = (
  logs: HabitLog[],
  startDate: string,
  endDate: string
): number => {
  return logs.filter(
    log => log.completedDate >= startDate && log.completedDate <= endDate
  ).length;
};

/**
 * Get the date of the last completion
 */
export const getLastCompletionDate = (logs: HabitLog[]): string | null => {
  if (logs.length === 0) return null;
  const sorted = logs.map(log => log.completedDate).sort().reverse();
  return sorted[0];
};

/**
 * Calculate streak status
 */
export interface StreakStatus {
  current: number;
  longest: number;
  isActive: boolean; // Was completed today or yesterday
  daysUntilBreak: number; // 0 if already broken, 1 if must complete today
}

export const getStreakStatus = (logs: HabitLog[]): StreakStatus => {
  const current = calculateCurrentStreak(logs);
  const longest = calculateLongestStreak(logs);
  const completedToday = isCompletedToday(logs);
  const lastCompletion = getLastCompletionDate(logs);

  let isActive = false;
  let daysUntilBreak = 0;

  if (lastCompletion) {
    const today = getToday();
    const yesterday = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));

    isActive = lastCompletion === today || lastCompletion === yesterday;

    if (completedToday) {
      daysUntilBreak = 2; // Can skip tomorrow
    } else if (lastCompletion === yesterday) {
      daysUntilBreak = 1; // Must complete today
    } else {
      daysUntilBreak = 0; // Streak is broken
    }
  }

  return {
    current,
    longest,
    isActive,
    daysUntilBreak,
  };
};
