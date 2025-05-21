import shortenParagraph from '../src/utils/shortenParagraph.js'

describe('shortenParagraph utility function', () => {
  // 13.1 Short text within limit
  describe('13.1 - Short text within limit', () => {
    test('should return unchanged if text is within maxLength', () => {
      expect(shortenParagraph('Hello world', 20)).toBe('Hello world')
    })
  })

  // 13.2 Exact length
  describe('13.2 - Exact length', () => {
    test('should return unchanged if text length equals maxLength', () => {
      expect(shortenParagraph('Exact match', 11)).toBe('Exact match')
    })
  })

  // 13.3 Long text with truncation
  describe('13.3 - Long text with truncation', () => {
    test('should trim text and add ellipsis if longer than maxLength', () => {
      expect(shortenParagraph('This is a long sentence.', 10)).toBe('This is a ...')
    })
  })

  // 13.4 Empty string
  describe('13.4 - Empty string', () => {
    test('should return empty string when input is empty', () => {
      expect(shortenParagraph('', 10)).toBe('')
    })
  })

  // 13.5 Zero maxLength
  describe('13.5 - Zero maxLength', () => {
    test('should return empty string if maxLength is 0', () => {
      expect(shortenParagraph("Text shouldn't show", 0)).toBe('')
    })
  })

  // 13.6 One character maxLength
  describe('13.6 - One character maxLength', () => {
    test('should return one character plus ellipsis', () => {
      expect(shortenParagraph('A full paragraph here.', 1)).toBe('A...')
    })
  })

  // 13.7 maxLength greater than paragraph
  describe('13.7 - maxLength greater than paragraph length', () => {
    test('should return full paragraph if maxLength is greater than text length', () => {
      expect(shortenParagraph('Tiny', 100)).toBe('Tiny')
    })
  })

  // 13.8 Null input
  describe('13.8 - Null input', () => {
    test('should return empty string if paragraph is null', () => {
      expect(shortenParagraph(null, 10)).toBe('')
    })
  })

  // 13.9 Undefined input
  describe('13.9 - Undefined input', () => {
    test('should return empty string if paragraph is undefined', () => {
      expect(shortenParagraph(undefined, 10)).toBe('')
    })
  })

  // 13.10 Non-string input
  describe('13.10 - Non-string input', () => {
    test('should convert number input to string before processing', () => {
      expect(shortenParagraph(123456789012345, 10)).toBe('1234567890...')
    })
  })
})
