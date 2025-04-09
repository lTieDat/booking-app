import { checkInputBooking } from '../src/utils/validation.js'

// All fields valid
describe('checkInputBooking - all valid inputs', () => {
  // Input: { location: { country: "France" }, booking: { startDate, endDate, adults: 2, rooms: 1 } }
  // Expected Output: {}
  test('returns empty error object if all inputs are valid', () => {
    const input = {
      location: { country: 'France' },
      booking: { startDate: '2025-04-10', endDate: '2025-04-15', adults: 2, rooms: 1 },
    }
    expect(checkInputBooking(input)).toEqual({
      errors: {},
      isValid: true,
    })
  })
})

// Missing country
describe('checkInputBooking - missing location', () => {
  // Input: { location: {}, booking: {...} }
  // Expected Output: { location: "Please select a valid location" }
  test('returns error for missing location', () => {
    const input = {
      location: {},
      booking: { startDate: '2025-04-10', endDate: '2025-04-15', adults: 2, rooms: 1 },
    }
    expect(checkInputBooking(input)).toHaveProperty('errors.location')
  })
})

// Missing dates
describe('checkInputBooking - missing date range', () => {
  // Input: booking.startDate and endDate are missing
  // Expected Output: { date: "Please select a valid date range" }
  test('returns error for missing date range', () => {
    const input = {
      location: { country: 'France' },
      booking: { adults: 2, rooms: 1 },
    }
    expect(checkInputBooking(input)).toHaveProperty('errors.date')
  })
})

// No adults
describe('checkInputBooking - zero adults', () => {
  // Input: adults = 0
  // Expected Output: { adults: "Please select at least one adult" }
  test('returns error for zero adults', () => {
    const input = {
      location: { country: 'France' },
      booking: { startDate: '2025-04-10', endDate: '2025-04-15', adults: 0, rooms: 1 },
    }
    expect(checkInputBooking(input)).toHaveProperty('errors.adults')
  })
})

// No rooms
describe('checkInputBooking - zero rooms', () => {
  // Input: rooms = 0
  // Expected Output: { rooms: "Please select at least one room" }
  test('returns error for zero rooms', () => {
    const input = {
      location: { country: 'France' },
      booking: { startDate: '2025-04-10', endDate: '2025-04-15', adults: 2, rooms: 0 },
    }
    expect(checkInputBooking(input)).toHaveProperty('errors.rooms')
  })
})
