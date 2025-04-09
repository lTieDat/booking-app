import { formatDateTime, getDateDifference, formatDateTimeExceptHour } from '../src/utils/timeFormat.js'

// ---------- formatDateTime ----------

describe('formatDateTime - standard date with time', () => {
  // Input: "2025-04-09T15:30:00Z"
  // Expected output: "Wednesday, April 9, 2025 at 3:30 PM" (may vary by timezone)
  test('formats full date and time correctly', () => {
    const result = formatDateTime('2025-04-09T15:30:00Z')
    expect(result).toMatch(/Wednesday, April 9, 2025/)
  })
})

describe('formatDateTime - midnight time', () => {
  // Input: "2025-04-09T00:00:00Z"
  // Expected output: "Wednesday, April 9, 2025 at 12:00 AM"
  test('formats midnight correctly', () => {
    const result = formatDateTime('2025-04-09T00:00:00Z')
    expect(result).toMatch(/Wednesday, April 9, 2025/)
  })
})

describe('formatDateTime - invalid date', () => {
  // Input: "not-a-date"
  // Expected output: "Invalid Date"
  test('handles invalid date input', () => {
    const result = formatDateTime('not-a-date')
    expect(result).toBe('Invalid Date')
  })
})

// ---------- getDateDifference ----------

describe('getDateDifference - same date', () => {
  // Input: "2025-04-09", "2025-04-09"
  // Expected output: 0
  test('returns 0 for same dates', () => {
    expect(getDateDifference('2025-04-09', '2025-04-09')).toBe(0)
  })
})

describe('getDateDifference - one day apart', () => {
  // Input: "2025-04-09", "2025-04-10"
  // Expected output: 1
  test('returns 1 for one day apart', () => {
    expect(getDateDifference('2025-04-09', '2025-04-10')).toBe(1)
  })
})

describe('getDateDifference - reversed dates', () => {
  // Input: "2025-04-10", "2025-04-09"
  // Expected output: -1
  test('returns negative for reversed dates', () => {
    expect(getDateDifference('2025-04-10', '2025-04-09')).toBe(-1)
  })
})

describe('getDateDifference - leap year', () => {
  // Input: "2024-02-28", "2024-03-01"
  // Expected output: 2
  test('handles leap year difference', () => {
    expect(getDateDifference('2024-02-28', '2024-03-01')).toBe(2)
  })
})

// ---------- formatDateTimeExceptHour ----------

describe('formatDateTimeExceptHour - standard date', () => {
  // Input: "2025-04-09T15:30:00Z"
  // Expected output: "Wednesday, April 9, 2025"
  test('formats date without time', () => {
    const result = formatDateTimeExceptHour('2025-04-09T15:30:00Z')
    expect(result).toMatch(/Wednesday, April 9, 2025/)
  })
})

describe('formatDateTimeExceptHour - leap day', () => {
  // Input: "2024-02-29"
  // Expected output: "Thursday, February 29, 2024"
  test('formats leap day correctly', () => {
    const result = formatDateTimeExceptHour('2024-02-29')
    expect(result).toMatch(/Thursday, February 29, 2024/)
  })
})

describe('formatDateTimeExceptHour - invalid date', () => {
  // Input: "bad-date"
  // Expected output: "Invalid Date"
  test('handles invalid date input', () => {
    const result = formatDateTimeExceptHour('bad-date')
    expect(result).toBe('Invalid Date')
  })
})
