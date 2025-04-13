import { checkInputBooking } from '../src/utils/validation'

describe('checkInputBooking', () => {
  // Test Case ID: 11.1
  // Purpose: Verify that a null booking object returns all validation errors
  // Input: null
  // Expected Output: { isValid: false, errors: { location, startDate, endDate, adults, rooms } }
  it('should return errors for null booking', () => {
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

  // Test Case ID: 11.2
  // Purpose: Verify that an undefined booking object returns all validation errors
  // Input: undefined
  // Expected Output: { isValid: false, errors: { location, startDate, endDate, adults, rooms } }
  it('should return errors for undefined booking', () => {
    const result = checkInputBooking(undefined)
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

  // Test Case ID: 11.3
  // Purpose: Verify that an empty booking object returns all validation errors
  // Input: {}
  // Expected Output: { isValid: false, errors: { location, startDate, endDate, adults, rooms } }
  it('should return errors for empty booking', () => {
    const result = checkInputBooking({})
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

  // Test Case ID: 11.4
  // Purpose: Verify that a booking with missing location.country returns a location error
  // Input: { location: {}, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { location } }
  it('should return errors for missing location.country', () => {
    const booking = {
      location: {},
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        location: 'Please select a valid location',
      },
    })
  })

  // Test Case ID: 11.5
  // Purpose: Verify that a booking with an empty country string returns a location error
  // Input: { location: { country: '' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { location } }
  it('should return errors for empty country string', () => {
    const booking = {
      location: { country: '' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        location: 'Please select a valid location',
      },
    })
  })

  // Test Case ID: 11.6
  // Purpose: Verify that a booking with missing booking object returns errors for all booking fields
  // Input: { location: { country: 'USA' } }
  // Expected Output: { isValid: false, errors: { startDate, endDate, adults, rooms } }
  it('should return errors for missing booking object', () => {
    const booking = {
      location: { country: 'USA' },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        startDate: 'Please select a valid start date',
        endDate: 'Please select a valid end date',
        adults: 'Please select at least one adult',
        rooms: 'Please select at least one room',
      },
    })
  })

  // Test Case ID: 11.7
  // Purpose: Verify that a booking with an invalid startDate returns a startDate error
  // Input: { location: { country: 'USA' }, booking: { startDate: 'invalid', endDate: '2025-06-05', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { startDate } }
  it('should return errors for invalid startDate', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: 'invalid',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        startDate: 'Please select a valid start date',
      },
    })
  })

  // Test Case ID: 11.8
  // Purpose: Verify that a booking with missing startDate returns a startDate error
  // Input: { location: { country: 'USA' }, booking: { endDate: '2025-06-05', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { startDate } }
  it('should return errors for missing startDate', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        endDate: '2025-06-05',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        startDate: 'Please select a valid start date',
      },
    })
  })

  // Test Case ID: 11.9
  // Purpose: Verify that a booking with an invalid endDate returns an endDate error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: 'invalid', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { endDate } }
  it('should return errors for invalid endDate', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: 'invalid',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        endDate: 'Please select a valid end date',
      },
    })
  })

  // Test Case ID: 11.10
  // Purpose: Verify that a booking with missing endDate returns an endDate error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { endDate } }
  it('should return errors for missing endDate', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        endDate: 'Please select a valid end date',
      },
    })
  })

  // Test Case ID: 11.11
  // Purpose: Verify that a booking with endDate before startDate returns an endDate error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-05', endDate: '2025-06-01', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { endDate } }
  it('should return errors for endDate before startDate', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-05',
        endDate: '2025-06-01',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        endDate: 'End date must be on or after start date',
      },
    })
  })

  // Test Case ID: 11.12
  // Purpose: Verify that a booking with zero adults returns an adults error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 0, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { adults } }
  it('should return errors for zero adults', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 0,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        adults: 'Please select at least one adult',
      },
    })
  })

  // Test Case ID: 11.13
  // Purpose: Verify that a booking with negative adults returns an adults error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: -1, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { adults } }
  it('should return errors for negative adults', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: -1,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        adults: 'Please select at least one adult',
      },
    })
  })

  // Test Case ID: 11.14
  // Purpose: Verify that a booking with non-numeric adults returns an adults error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 'two', rooms: 1 } }
  // Expected Output: { isValid: false, errors: { adults } }
  it('should return errors for non-numeric adults', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 'two',
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        adults: 'Please select at least one adult',
      },
    })
  })

  // Test Case ID: 11.15
  // Purpose: Verify that a booking with non-integer adults returns an adults error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 1.5, rooms: 1 } }
  // Expected Output: { isValid: false, errors: { adults } }
  it('should return errors for non-integer adults', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 1.5,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        adults: 'Please select at least one adult',
      },
    })
  })

  // Test Case ID: 11.16
  // Purpose: Verify that a booking with zero rooms returns a rooms error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: 0 } }
  // Expected Output: { isValid: false, errors: { rooms } }
  it('should return errors for zero rooms', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 0,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        rooms: 'Please select at least one room',
      },
    })
  })

  // Test Case ID: 11.17
  // Purpose: Verify that a booking with negative rooms returns a rooms error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: -1 } }
  // Expected Output: { isValid: false, errors: { rooms } }
  it('should return errors for negative rooms', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: -1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        rooms: 'Please select at least one room',
      },
    })
  })

  // Test Case ID: 11.18
  // Purpose: Verify that a booking with non-numeric rooms returns a rooms error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: 'one' } }
  // Expected Output: { isValid: false, errors: { rooms } }
  it('should return errors for non-numeric rooms', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 'one',
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        rooms: 'Please select at least one room',
      },
    })
  })

  // Test Case ID: 11.19
  // Purpose: Verify that a booking with non-integer rooms returns a rooms error
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: 1.5 } }
  // Expected Output: { isValid: false, errors: { rooms } }
  it('should return errors for non-integer rooms', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 1.5,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: false,
      errors: {
        rooms: 'Please select at least one room',
      },
    })
  })

  // Test Case ID: 11.20
  // Purpose: Verify that a valid booking passes with no errors
  // Input: { location: { country: 'USA' }, booking: { startDate: '2025-06-01', endDate: '2025-06-05', adults: 2, rooms: 1 } }
  // Expected Output: { isValid: true, errors: {} }
  it('should pass validation for valid booking', () => {
    const booking = {
      location: { country: 'USA' },
      booking: {
        startDate: '2025-06-01',
        endDate: '2025-06-05',
        adults: 2,
        rooms: 1,
      },
    }
    const result = checkInputBooking(booking)
    expect(result).toEqual({
      isValid: true,
      errors: {},
    })
  })
})
