import type { Category } from '../../types';
import { useHabits } from '../../hooks/useHabits';

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Health',
  'Fitness',
  'Productivity',
  'Learning',
  'Mindfulness',
  'Social',
  'Other',
];

export const CategoryFilter = () => {
  const { categoryFilter, setCategoryFilter } = useHabits();
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => {
        const active = categoryFilter === c;
        return (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              active
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800'
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
};
