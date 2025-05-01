import { formatDateTime, getDateDifference, formatDateTimeExceptHour } from '../src/utils/timeFormat.js'

/* =============================
   14.x - Tests for formatDateTime
============================= */

describe('formatDateTime', () => {
  // 14.1 Valid date with full format
  test('14.1 - formats full date and time correctly', () => {
    expect(formatDateTime('2025-04-09T15:30:00Z')).toMatch(/Wednesday, April 9, 2025 at 3:30 PM/)
  })

  // 14.2 Midnight time
  test('14.2 - formats midnight correctly', () => {
    expect(formatDateTime('2025-04-09T00:00:00Z')).toMatch(/Wednesday, April 9, 2025 at 12:00 AM/)
  })

  // 14.3 Early morning time
  test('14.3 - formats early morning time correctly', () => {
    expect(formatDateTime('2025-04-09T06:15:00Z')).toMatch(/Wednesday, April 9, 2025 at 6:15 AM/)
  })

  // 14.4 Invalid date string
  test('14.4 - returns "Invalid Date" for invalid input', () => {
    expect(formatDateTime('invalid-date')).toBe('Invalid Date')
  })
})

/* =============================
   14.x - Tests for getDateDifference
============================= */

describe('getDateDifference', () => {
  // 14.5 Same date
  test('14.5 - returns 0 for same dates', () => {
    expect(getDateDifference('2025-04-09', '2025-04-09')).toBe(0)
  })

  // 14.6 One day apart
  test('14.6 - returns 1 for one day apart', () => {
    expect(getDateDifference('2025-04-09', '2025-04-10')).toBe(1)
  })

  // 14.7 Leap year difference
  test('14.7 - handles leap year properly (Feb 28 to Mar 1)', () => {
    expect(getDateDifference('2024-02-28', '2024-03-01')).toBe(2)
  })

  // 14.8 Reverse order (negative difference)
  test('14.8 - returns negative difference for reversed dates', () => {
    expect(getDateDifference('2025-04-10', '2025-04-09')).toBe(-1)
  })

  // 14.9 Month boundary
  test('14.9 - returns 1 when crossing month boundary', () => {
    expect(getDateDifference('2025-03-31', '2025-04-01')).toBe(1)
  })
})

/* =============================
   14.x - Tests for formatDateTimeExceptHour
============================= */

describe('formatDateTimeExceptHour', () => {
  // 14.10 Standard date
  test('14.10 - formats date without time (standard)', () => {
    expect(formatDateTimeExceptHour('2025-04-09T15:30:00Z')).toMatch(/Wednesday, April 9, 2025/)
  })

  // 14.11 Start of month
  test('14.11 - formats start of month correctly', () => {
    expect(formatDateTimeExceptHour('2025-04-01T00:00:00Z')).toMatch(/Tuesday, April 1, 2025/)
  })

  // 14.12 Leap year date
  test('14.12 - formats leap year day correctly', () => {
    expect(formatDateTimeExceptHour('2024-02-29')).toMatch(/Thursday, February 29, 2024/)
  })

  // 14.13 Invalid input
  test('14.13 - returns "Invalid Date" for bad input', () => {
    expect(formatDateTimeExceptHour('bad-date')).toBe('Invalid Date')
  })
})
