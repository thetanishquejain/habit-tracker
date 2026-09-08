interface Props {
  value: number; // 0-100
  className?: string;
}

export const ProgressBar = ({ value, className = '' }: Props) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-indigo-600 transition-[width] duration-500 ease-out dark:bg-indigo-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};
