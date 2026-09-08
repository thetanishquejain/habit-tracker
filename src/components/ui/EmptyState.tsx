import type { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, message, action }: Props) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/50 px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900/40">
    {icon && <div className="mb-3 text-4xl">{icon}</div>}
    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    {message && (
      <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">{message}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
