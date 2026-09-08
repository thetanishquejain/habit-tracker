import { Badge } from '../ui/Badge';
import { frequencyLabelShort } from '../../utils/frequency';

export const FrequencyBadge = ({ target }: { target: number }) => (
  <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
    {frequencyLabelShort(target)}
  </Badge>
);
