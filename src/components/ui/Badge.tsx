import type { ReactNode } from 'react';
import type { Category } from '../../types';
import { getCategoryColorClasses } from '../../utils/colorUtils';

export const CategoryBadge = ({ category }: { category: Category }) => {
  const c = getCategoryColorClasses(category);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}>
      {category}
    </span>
  );
};

export const Badge = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);
