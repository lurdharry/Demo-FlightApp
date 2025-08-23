import { format, parseISO } from "date-fns";

/**
 * Formats a Date object to ISO date string (YYYY-MM-DD)
 */
export const formatDate = (date: Date = new Date()): string => {
  return format(date, "yyyy-MM-dd");
};

/**
 * Formats a date string to display format (e.g., "Mon, Jan 15")
 */
export const formatDisplayDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "EEE, MMM d");
};

/**
 * Formats a date string to time format (HH:mm)
 */
export const formatTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "HH:mm");
};

/**
 * Formats duration in minutes to readable format (e.g., "2h 30m")
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
