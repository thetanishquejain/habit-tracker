interface Props {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size = 24, className = '' }: Props) => (
  <span
    role="status"
    aria-label="Loading"
    className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 dark:border-gray-700 dark:border-t-indigo-400 ${className}`}
    style={{ width: size, height: size }}
  />
);
