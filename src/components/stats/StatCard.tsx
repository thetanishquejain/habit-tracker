import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: ReactNode;
  hint?: string;
}

export const StatCard = ({ label, value, hint }: Props) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    {hint && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
  </div>
);
