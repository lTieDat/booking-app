import pluralize from '../src/utils/pluralize'

describe('pluralize', () => {
  // Test Case 12.1: Singular form when count is exactly 1
  describe('when count is 1', () => {
    test('returns singular form for count of 1', () => {
      // Arrange: count = 1, testing the <= 1 condition
      // Act: Call pluralize with count = 1
      // Assert: Expect singular form "room" to be returned
      expect(pluralize(1, 'room', 'rooms')).toBe('room')
    })
  })

  // Test Case 12.2: Plural form when count is greater than 1
  describe('when count is greater than 1', () => {
    test('returns plural form for count of 2', () => {
      // Arrange: count = 2, testing the > 1 condition
      // Act: Call pluralize with count = 2
      // Assert: Expect plural form "rooms" to be returned
      expect(pluralize(2, 'room', 'rooms')).toBe('rooms')
    })
  })

  // Test Case 12.3: Singular form when count is 0
  describe('when count is 0', () => {
    test('returns singular form for count of 0', () => {
      // Arrange: count = 0, testing the <= 1 condition (common UX choice)
      // Act: Call pluralize with count = 0
      // Assert: Expect singular form "guest" to be returned
      expect(pluralize(0, 'guest', 'guests')).toBe('guest')
    })
  })

  // Test Case 12.5: Custom irregular plural form
  describe('when using irregular plural form', () => {
    test('returns custom plural form for count greater than 1', () => {
      // Arrange: count = 2, testing irregular plural with > 1 condition
      // Act: Call pluralize with irregular singular/plural pair
      // Assert: Expect "people" (irregular plural) to be returned
      expect(pluralize(2, 'person', 'people')).toBe('people')
    })
  })

  //Test Case 12.4: Negative count
  describe('when count is negative', () => {
    test('throws an error for negative count', () => {
      // Arrange: count = -1, which is not a valid scenario for pluralization
      // Act & Assert: Expect the function to throw
      expect(() => pluralize(-1, 'item', 'items')).toThrow('Count cannot be negative')
    })
  })

  //Test Case  12.6: Non-integer count
  describe('when count is a non-integer', () => {
    test('returns plural form for decimal greater than 1', () => {
      // Arrange: count = 1.5, testing the > 1 condition with decimal
      // Act: Call pluralize with count = 1.5
      // Assert: Expect plural form "days" to be returned
      expect(pluralize(1.5, 'day', 'days')).toBe('days')
    })

    test('returns singular form for decimal less than or equal to 1', () => {
      // Arrange: count = 0.5, testing the <= 1 condition with decimal
      // Act: Call pluralize with count = 0.5
      // Assert: Expect singular form "hour" to be returned
      expect(pluralize(0.5, 'hour', 'hours')).toBe('hour')
    })
  })

  //Test Case 12.7: Empty strings
  describe('when singular or plural is an empty string', () => {
    test('returns empty plural string when count > 1', () => {
      // Arrange: count = 2, plural is empty, testing > 1 condition
      // Act: Call pluralize with empty plural
      // Assert: Expect empty string to be returned
      expect(pluralize(2, 'cat', '')).toBe('')
    })

    test('returns empty singular string when count <= 1', () => {
      // Arrange: count = 1, singular is empty, testing <= 1 condition
      // Act: Call pluralize with empty singular
      // Assert: Expect empty string to be returned
      expect(pluralize(1, '', 'dogs')).toBe('')
    })
  })
})
