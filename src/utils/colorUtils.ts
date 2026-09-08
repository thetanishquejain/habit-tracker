import { CATEGORY_COLORS, CATEGORY_COLOR_CLASSES, type Category } from '../types';

/**
 * Get the base color name for a category
 */
export const getCategoryColor = (category: Category): string => {
  return CATEGORY_COLORS[category];
};

/**
 * Get Tailwind color classes for a category
 */
export const getCategoryColorClasses = (category: Category): {
  bg: string;
  text: string;
  border: string;
} => {
  return CATEGORY_COLOR_CLASSES[category];
};

/**
 * Get a hex color for a category (for use in charts)
 */
export const getCategoryHexColor = (category: Category): string => {
  const colorMap: Record<Category, string> = {
    Health: '#10b981',      // green-500
    Fitness: '#3b82f6',     // blue-500
    Productivity: '#a855f7', // purple-500
    Learning: '#eab308',    // yellow-500
    Mindfulness: '#ec4899', // pink-500
    Social: '#6366f1',      // indigo-500
    Other: '#6b7280',       // gray-500
  };
  return colorMap[category];
};

/**
 * Generate a random color for new habits
 */
export const getRandomColor = (): string => {
  const colors = ['green', 'blue', 'purple', 'yellow', 'pink', 'indigo', 'gray'];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Get a lighter version of a category color for backgrounds
 */
export const getCategoryLightColor = (category: Category): string => {
  const colorMap: Record<Category, string> = {
    Health: '#d1fae5',      // green-100
    Fitness: '#dbeafe',     // blue-100
    Productivity: '#f3e8ff', // purple-100
    Learning: '#fef9c3',    // yellow-100
    Mindfulness: '#fce7f3', // pink-100
    Social: '#e0e7ff',      // indigo-100
    Other: '#f3f4f6',       // gray-100
  };
  return colorMap[category];
};
