export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`} />
);

export const HabitCardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="flex items-start justify-between">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <Skeleton className="mt-3 h-4 w-full" />
    <Skeleton className="mt-2 h-4 w-2/3" />
    <Skeleton className="mt-4 h-6 w-20 rounded-full" />
  </div>
);

export const StatCardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="mt-3 h-8 w-16" />
  </div>
);
