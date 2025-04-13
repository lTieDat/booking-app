import shortenParagraph from '../src/utils/shortenParagraph.js'

// Shorter than maxLength
describe('shortenParagraph - no shortening needed', () => {
  // Input: "Short text", maxLength: 20
  // Expected Output: "Short text"
  test('returns paragraph unchanged if shorter than maxLength', () => {
    expect(shortenParagraph('Short text', 20)).toBe('Short text')
  })
})

// Longer than maxLength
describe('shortenParagraph - trimming with ellipsis', () => {
  // Input: "This is a very long paragraph", maxLength: 10
  // Expected Output: "This is a ..."
  test('trims long paragraph and adds ellipsis', () => {
    expect(shortenParagraph('This is a very long paragraph', 10)).toBe('This is a ...')
  })
})
