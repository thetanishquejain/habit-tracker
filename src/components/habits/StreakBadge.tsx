import { Badge } from '../ui/Badge';

interface Props {
  current: number;
  longest?: number;
  unit?: 'day' | 'week';
}

export const StreakBadge = ({ current, longest, unit = 'day' }: Props) => {
  const tone =
    current >= 30
      ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
      : current >= 7
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';

  const noun = unit === 'week' ? 'week' : 'day';
  const title =
    longest !== undefined
      ? `Current streak: ${current} · Longest: ${longest}`
      : undefined;

  return (
    <Badge className={tone}>
      <span title={title}>
        {current > 0 ? '🔥' : '·'} {current} {noun}
        {current === 1 ? '' : 's'}
      </span>
    </Badge>
  );
};
