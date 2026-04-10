export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatDate(value?: string | null) {
  if (!value) return 'Not available';

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);
}

export function getNightCount(checkIn?: string | null, checkOut?: string | null) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;

  return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export function pluralize(count: number, singular: string, plural: string) {
  if (count < 0) {
    throw new Error('Count cannot be negative');
  }

  return count > 1 ? plural : singular;
}

export function formatDateTime(value?: string | null) {
  if (!value) return 'Invalid Date';

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(parsedDate);
}

export function formatDateTimeExceptHour(value?: string | null) {
  if (!value) return 'Invalid Date';

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);
}

export function getDateDifference(startDate?: string | null, endDate?: string | null) {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const normalizedStart = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const normalizedEnd = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.round((normalizedEnd - normalizedStart) / (1000 * 60 * 60 * 24));
}
