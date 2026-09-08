import type { HabitLog } from '../types';
import { formatDate } from '../utils/dateUtils';

// Helper function to generate dates (local YYYY-MM-DD, matching the rest of the app)
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};

// Helper to generate log entries for a habit
const generateLogs = (
  habitId: string,
  startDaysAgo: number,
  pattern: 'consistent' | 'sporadic' | 'recent'
): HabitLog[] => {
  const logs: HabitLog[] = [];
  let logId = 1;

  for (let i = startDaysAgo; i >= 0; i--) {
    let shouldLog = false;

    switch (pattern) {
      case 'consistent':
        // 90% completion rate
        shouldLog = Math.random() > 0.1;
        break;
      case 'sporadic':
        // 50% completion rate
        shouldLog = Math.random() > 0.5;
        break;
      case 'recent':
        // Only completed in last 14 days, 80% completion rate
        shouldLog = i <= 14 && Math.random() > 0.2;
        break;
    }

    if (shouldLog) {
      const completedDate = generateDate(i);
      logs.push({
        id: `${habitId}-log-${logId++}`,
        habitId,
        completedDate,
        createdAt: new Date(completedDate).toISOString(),
      });
    }
  }

  return logs;
};

// Generate mock logs for the past 120 days
export const mockLogs: HabitLog[] = [
  // Meditation - very consistent (started 120 days ago)
  ...generateLogs('1', 120, 'consistent'),

  // Drink Water - very consistent (started 120 days ago)
  ...generateLogs('2', 120, 'consistent'),

  // Exercise - sporadic (started 90 days ago)
  ...generateLogs('3', 90, 'sporadic'),

  // Read - consistent (started 75 days ago)
  ...generateLogs('4', 75, 'consistent'),

  // Deep Work - sporadic (started 60 days ago)
  ...generateLogs('5', 60, 'sporadic'),

  // Gratitude Journal - recent habit (started 45 days ago)
  ...generateLogs('6', 45, 'recent'),

  // Call Family - sporadic (started 30 days ago)
  ...generateLogs('7', 30, 'sporadic'),

  // Practice Spanish - recent habit (started 15 days ago)
  ...generateLogs('8', 15, 'recent'),
];

// Helper function to get logs for a specific habit
export const getLogsForHabit = (habitId: string): HabitLog[] => {
  return mockLogs.filter(log => log.habitId === habitId);
};

// Helper function to get logs for a specific date
export const getLogsForDate = (date: string): HabitLog[] => {
  return mockLogs.filter(log => log.completedDate === date);
};

// Helper function to check if a habit was completed on a date
export const isHabitCompletedOnDate = (habitId: string, date: string): boolean => {
  return mockLogs.some(log => log.habitId === habitId && log.completedDate === date);
};
