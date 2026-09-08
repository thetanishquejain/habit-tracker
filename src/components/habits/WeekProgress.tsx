interface Props {
  done: number;
  target: number;
}

/** Compact "n / target this week" pips shown for non-daily habits. */
export const WeekProgress = ({ done, target }: Props) => {
  const met = done >= target;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
      title={`${done} of ${target} completed this week`}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: target }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i < done
                ? met
                  ? 'bg-emerald-500'
                  : 'bg-indigo-500'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </span>
      {done}/{target} this week
    </span>
  );
};
