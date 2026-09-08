/**
 * Date utility functions for the habit tracker
 */

/**
 * Format a date to YYYY-MM-DD string using the date's *local* components.
 *
 * Note: we intentionally avoid `toISOString()` here — it converts to UTC first,
 * which shifts the calendar day by one for anyone east/west of UTC around
 * midnight and made the calendar render the wrong day numbers.
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get today's date as YYYY-MM-DD string
 */
export const getToday = (): string => {
  return formatDate(new Date());
};

/**
 * Check if a date string is today
 */
export const isToday = (dateStr: string): boolean => {
  return dateStr === getToday();
};

/**
 * Get a date N days ago
 */
export const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
};

/**
 * Get a date N days in the future
 */
export const getDaysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

/**
 * Parse a date string (YYYY-MM-DD) to Date object
 */
export const parseDate = (dateStr: string): Date => {
  return new Date(dateStr + 'T00:00:00');
};

/**
 * Check if a date string is in the past
 */
export const isPast = (dateStr: string): boolean => {
  const date = parseDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if a date string is in the future
 */
export const isFuture = (dateStr: string): boolean => {
  const date = parseDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

/**
 * Calculate the difference in days between two dates
 */
export const daysDifference = (date1Str: string, date2Str: string): number => {
  const date1 = parseDate(date1Str);
  const date2 = parseDate(date2Str);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get the day of week for a date (0 = Sunday, 6 = Saturday)
 */
export const getDayOfWeek = (dateStr: string): number => {
  return parseDate(dateStr).getDay();
};

/**
 * Get the day of week name for a date
 */
export const getDayOfWeekName = (dateStr: string): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[getDayOfWeek(dateStr)];
};

/**
 * Get the short day of week name for a date
 */
export const getShortDayOfWeekName = (dateStr: string): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[getDayOfWeek(dateStr)];
};

/**
 * Get the month name for a date
 */
export const getMonthName = (dateStr: string): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[parseDate(dateStr).getMonth()];
};

/**
 * Get the short month name for a date
 */
export const getShortMonthName = (dateStr: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[parseDate(dateStr).getMonth()];
};

/**
 * Format date for display (e.g., "Jan 15, 2024")
 */
export const formatDisplayDate = (dateStr: string): string => {
  const date = parseDate(dateStr);
  return `${getShortMonthName(dateStr)} ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * Format date for display with day (e.g., "Mon, Jan 15")
 */
export const formatDisplayDateWithDay = (dateStr: string): string => {
  const date = parseDate(dateStr);
  return `${getShortDayOfWeekName(dateStr)}, ${getShortMonthName(dateStr)} ${date.getDate()}`;
};

/**
 * Get an array of dates between two dates (inclusive)
 */
export const getDateRange = (startDateStr: string, endDateStr: string): string[] => {
  const dates: string[] = [];
  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Get the first day of the month for a given date
 */
export const getFirstDayOfMonth = (dateStr: string): string => {
  const date = parseDate(dateStr);
  return formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
};

/**
 * Get the last day of the month for a given date
 */
export const getLastDayOfMonth = (dateStr: string): string => {
  const date = parseDate(dateStr);
  return formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
};

/**
 * Get all dates in a month
 */
export const getDatesInMonth = (year: number, month: number): string[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return getDateRange(formatDate(firstDay), formatDate(lastDay));
};

/**
 * Get relative time string (e.g., "2 days ago", "today", "tomorrow")
 */
export const getRelativeTimeString = (dateStr: string): string => {
  const today = getToday();
  const diff = daysDifference(today, dateStr);

  if (dateStr === today) return 'Today';
  if (dateStr === getDaysAgo(-1)) return 'Tomorrow';
  if (dateStr === getDaysAgo(1)) return 'Yesterday';

  if (isPast(dateStr)) {
    return `${diff} day${diff > 1 ? 's' : ''} ago`;
  } else {
    return `In ${diff} day${diff > 1 ? 's' : ''}`;
  }
};
