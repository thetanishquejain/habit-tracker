import { CoinIcon } from './CoinIcon';

export const CoinBalance = ({
  balance,
  size = 'md',
}: {
  balance: number;
  size?: 'sm' | 'md';
}) => (
  <span
    className={`inline-flex items-center gap-1.5 font-semibold text-gray-800 dark:text-gray-100 ${
      size === 'sm' ? 'text-sm' : 'text-base'
    }`}
    title={`${balance} Consistency Coins`}
  >
    <CoinIcon size={size === 'sm' ? 14 : 18} />
    {balance.toLocaleString()}
  </span>
);
