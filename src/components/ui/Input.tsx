import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

const fieldBase =
  'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500';

const borderOk = 'border-gray-300 dark:border-gray-700';
const borderErr = 'border-red-400 dark:border-red-500';

export const Label = ({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) => (
  <label
    htmlFor={htmlFor}
    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    {children}
  </label>
);

export const FieldError = ({ children }: { children?: ReactNode }) =>
  children ? (
    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{children}</p>
  ) : null;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export const Input = ({ error, className = '', ...props }: InputProps) => (
  <input
    className={`${fieldBase} ${error ? borderErr : borderOk} ${className}`}
    {...props}
  />
);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
export const Textarea = ({ error, className = '', ...props }: TextareaProps) => (
  <textarea
    className={`${fieldBase} ${error ? borderErr : borderOk} ${className}`}
    {...props}
  />
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}
export const Select = ({ error, className = '', children, ...props }: SelectProps) => (
  <select
    className={`${fieldBase} bg-white ${error ? borderErr : borderOk} ${className}`}
    {...props}
  >
    {children}
  </select>
);
