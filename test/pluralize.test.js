import pluralize from '../src/utils/pluralize'
// Singular form (1 room)
describe('pluralize - singular case', () => {
  // Input: 1, "room", "rooms"
  // Expected Output: "room"
  test('returns singular form for count of 1', () => {
    expect(pluralize(1, 'room', 'rooms')).toBe('room')
  })
})

// Plural form (2 rooms)
describe('pluralize - plural case', () => {
  // Input: 2, "room", "rooms"
  // Expected Output: "rooms"
  test('returns plural form for count greater than 1', () => {
    expect(pluralize(2, 'room', 'rooms')).toBe('rooms')
  })
})

// Zero count (0 guests)
describe('pluralize - zero case', () => {
  // Input: 0, "guest", "guests"
  // Expected Output: "guest"
  test('returns singular form for 0 count', () => {
    expect(pluralize(0, 'guest', 'guests')).toBe('guest')
  })
})

// Custom plural (2 people)
describe('pluralize - custom plural form', () => {
  // Input: 2, "person", "people"
  // Expected Output: "people"
  test('returns custom plural form correctly', () => {
    expect(pluralize(2, 'person', 'people')).toBe('people')
  })
})
