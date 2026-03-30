import { checkInputBooking } from '../booking-validation'

describe('checkInputBooking', () => {
  describe('Valid Inputs', () => {
    // Test Case ID: 11.1 (Test Plan 11.1) - All valid inputs
    it('should pass validation for all valid inputs', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: true,
        errors: {},
      })
    })

    // Test Case ID: 11.19 (Test Plan 11.19) - Same-day booking
    it('should pass validation for same-day booking', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-01', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: true,
        errors: {},
      })
    })
  })

  describe('Missing Fields', () => {
    // Test Case ID: 11.2 (Test Plan 11.2) - Missing country field
    it('should return errors for missing country field', () => {
      const booking = {
        location: {},
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid country or location',
        },
      })
    })

    // Test Case ID: 11.3 (Test Plan 11.3) - Missing date range
    it('should return errors for missing date range', () => {
      const booking = {
        location: { country: 'France' },
        booking: { adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          date: 'Please select a valid date range',
        },
      })
    })

    // Test Case ID: 11.10 (Test Plan 11.1, second instance) - Missing location object
    it('should return errors for missing location object', () => {
      const booking = {
        booking: { startDate: '2025-04-10', endDate: '2025-04-15', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid location',
        },
      })
    })

    // Test Case ID: 11.11 (Test Plan 11.11) - Missing checkin date
    it('should return errors for missing checkin date', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '', endDate: '2025-05-10', adults: 0, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          date: 'Please select a checkin date',
        },
      })
    })

    // Test Case ID: 11.12 (Test Plan 11.12) - Missing booking object
    it('should return errors for missing booking object', () => {
      const booking = {
        location: { country: 'France' },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          date: 'Please select a valid date range',
          adults: 'Please select at least one adult',
          rooms: 'Please select at least one room',
        },
      })
    })

    // Test Case ID: 11.13 (Test Plan 11.13) - Missing checkout date
    it('should return errors for missing checkout date', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-10', endDate: '', adults: 0, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          date: 'Please select a checkout date',
        },
      })
    })
  })

  describe('Invalid Values', () => {
    // Test Case ID: 11.4 (Test Plan 11.4) - Zero adults
    it('should return errors for zero adults', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 0, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          adults: 'Please select at least one adult',
        },
      })
    })

    // Test Case ID: 11.5 (Test Plan 11.5) - Zero rooms
    it('should return errors for zero rooms', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: 0 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          rooms: 'Please select at least one room',
        },
      })
    })

    // Test Case ID: 11.6 (Test Plan 11.6) - Empty input
    it('should return errors for empty input', () => {
      const booking = {
        location: { country: '' },
        booking: { startDate: '', endDate: '', adults: 0, rooms: 0 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid location',
          date: 'Please select a valid date range',
          adults: 'Please select at least one adult',
          rooms: 'Please select at least one room',
        },
      })
    })

    // Test Case ID: 11.7 (Test Plan 11.7) - Non-string country
    it('should return errors for non-string country', () => {
      const booking = {
        location: { country: 123 },
        booking: { startDate: '', endDate: '', adults: 0, rooms: 0 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid location',
        },
      })
    })

    // Test Case ID: 11.8 (Test Plan 11.8) - Non-numeric adults
    it('should return errors for non-numeric adults', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 'two', rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          adults: 'Please select at least one adult',
        },
      })
    })

    // Test Case ID: 11.9 (Test Plan 11.9) - Non-numeric rooms
    it('should return errors for non-numeric rooms', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: 'one' },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          rooms: 'Please select at least one room',
        },
      })
    })

    // Test Case ID: 11.14 (Test Plan 11.14) - End date before start date
    it('should return errors for end date before start date', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-10', endDate: '2025-05-01', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          endDate: 'End date must be on or after start date',
        },
      })
    })

    // Test Case ID: 11.15 (Test Plan 11.15) - Non-integer adults
    it('should return errors for non-integer adults', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 1.5, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          adults: 'Please select at least one adult',
        },
      })
    })

    // Test Case ID: 11.16 (Test Plan 11.16) - Non-integer rooms
    it('should return errors for non-integer rooms', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: 1.5 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          rooms: 'Please select at least one room',
        },
      })
    })

    // Test Case ID: 11.17 (Test Plan 11.17) - Invalid date format
    it('should return errors for invalid date format', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: 'invalid', endDate: '2025-05-10', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          startDate: 'Please select a valid start date',
        },
      })
    })

    // Test Case ID: 11.18 (Test Plan 11.18) - Whitespace country
    it('should return errors for whitespace country', () => {
      const booking = {
        location: { country: '   ' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid location',
        },
      })
    })

    // Test Case ID: 11.20 (Test Plan 11.20) - Multiple invalid fields
    it('should return errors for multiple invalid fields', () => {
      const booking = {
        location: { country: '' },
        booking: { startDate: 'invalid', endDate: '', adults: 0, rooms: -1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid location',
          startDate: 'Please select a valid start date',
          endDate: 'Please select a valid end date',
          adults: 'Please select at least one adult',
          rooms: 'Please select at least one room',
        },
      })
    })
  })

  describe('Additional Edge Cases', () => {
    // Test Case ID: Additional - Null booking input
    it('should return errors for null booking input', () => {
      const result = checkInputBooking(null)
      expect(result).toEqual({
        isValid: false,
        errors: {
          location: 'Please select a valid location',
          startDate: 'Please select a valid start date',
          endDate: 'Please select a valid end date',
          adults: 'Please select at least one adult',
          rooms: 'Please select at least one room',
        },
      })
    })

    // Test Case ID: Additional - Negative adults
    it('should return errors for negative adults', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: -1, rooms: 1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          adults: 'Please select at least one adult',
        },
      })
    })

    // Test Case ID: Additional - Negative rooms
    it('should return errors for negative rooms', () => {
      const booking = {
        location: { country: 'France' },
        booking: { startDate: '2025-05-01', endDate: '2025-05-10', adults: 2, rooms: -1 },
      }
      const result = checkInputBooking(booking)
      expect(result).toEqual({
        isValid: false,
        errors: {
          rooms: 'Please select at least one room',
        },
      })
    })
  })
})
