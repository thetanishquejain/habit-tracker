// Habit categories
export type Category =
  | 'Health'
  | 'Fitness'
  | 'Productivity'
  | 'Learning'
  | 'Mindfulness'
  | 'Social'
  | 'Other';

// Main habit interface
export interface Habit {
  id: string;
  name: string;
  description: string;
  category: Category;
  color: string;
  createdAt: string; // ISO date string
  archivedAt?: string; // ISO date string
  /**
   * Weekly completion target, 1-7 days. Absent or 7 means "every day".
   * Added in the custom-frequency feature; older habits have no value.
   */
  targetPerWeek?: number;
}

// Habit completion log
export interface HabitLog {
  id: string;
  habitId: string;
  completedDate: string; // ISO date string (YYYY-MM-DD)
  notes?: string;
  createdAt: string; // ISO date string
}

// Habit statistics
export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate7Days: number; // 0-100
  completionRate30Days: number; // 0-100
  completionRate90Days: number; // 0-100
}

// Category color mapping
export const CATEGORY_COLORS: Record<Category, string> = {
  Health: 'green',
  Fitness: 'blue',
  Productivity: 'purple',
  Learning: 'yellow',
  Mindfulness: 'pink',
  Social: 'indigo',
  Other: 'gray',
};

// Category color class mapping for Tailwind (light + dark variants)
export const CATEGORY_COLOR_CLASSES: Record<
  Category,
  { bg: string; text: string; border: string }
> = {
  Health: {
    bg: 'bg-green-100 dark:bg-green-500/15',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-500',
  },
  Fitness: {
    bg: 'bg-blue-100 dark:bg-blue-500/15',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-500',
  },
  Productivity: {
    bg: 'bg-purple-100 dark:bg-purple-500/15',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-500',
  },
  Learning: {
    bg: 'bg-yellow-100 dark:bg-yellow-500/15',
    text: 'text-yellow-700 dark:text-yellow-300',
    border: 'border-yellow-500',
  },
  Mindfulness: {
    bg: 'bg-pink-100 dark:bg-pink-500/15',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-500',
  },
  Social: {
    bg: 'bg-indigo-100 dark:bg-indigo-500/15',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-500',
  },
  Other: {
    bg: 'bg-gray-100 dark:bg-gray-500/15',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-500',
  },
};
