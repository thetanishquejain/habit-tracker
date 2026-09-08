export const CoinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#f59e0b" />
    <circle cx="12" cy="12" r="7" fill="#fbbf24" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="9"
      fontWeight="700"
      fill="#92400e"
    >
      C
    </text>
  </svg>
);
