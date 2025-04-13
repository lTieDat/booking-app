import extractLocationDetails from '../src/utils/addressFormat'

describe('extractLocationDetails', () => {
  // 10.1: All fields present
  describe('when all fields are present', () => {
    test('normalizes all fields correctly', () => {
      // Purpose: Test normalization of all fields using removeDiacritics
      const input = {
        address: 'Thanh Xuan District, Hanoi Province',
        district: 'Thanh Xuan',
        state: 'Hanoi',
        city: 'Hà Nội',
        country: 'Việt Nam',
      }
      const expected = {
        address: 'Thanh Xuan District, Hanoi Province',
        district: 'thanh xuan',
        state: 'hanoi',
        city: 'ha noi',
        country: 'viet nam',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests normalization; prioritizes provided district/state; covers regex and removeDiacritics
    })
  })

  // 10.2: Missing district and state fields
  describe('when district and state are missing', () => {
    test('extracts district from address and normalizes fields', () => {
      // Purpose: Test extraction of district from address when fields are missing
      const input = {
        address: 'Paris District',
        city: 'Paris',
        country: 'France',
      }
      const expected = {
        address: 'Paris District',
        city: 'paris',
        country: 'france',
        district: 'paris',
        state: '',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests regex extraction for district; state empty (no Province); normalizes city/country
    })
  })

  // 10.3: Missing country field
  describe('when country is missing', () => {
    test('extracts district and state from address', () => {
      // Purpose: Test extraction of district and state with missing country
      const input = {
        address: 'Central District, Bangkok Province',
        city: 'Bangkok',
      }
      const expected = {
        address: 'Central District, Bangkok Province',
        district: 'central',
        state: 'bangkok',
        city: 'bangkok',
        country: '',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests regex for district/state; normalizes empty country and city
    })
  })

  // 10.4: Input is empty object
  describe('when input is an empty object', () => {
    test('returns empty object unchanged', () => {
      // Purpose: Test handling of empty object input
      const input = {}
      const expected = {}
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests !location.address condition; returns input unchanged
    })
  })

  // 10.5: All fields are empty strings
  describe('when all fields are empty strings', () => {
    test('returns input unchanged due to empty address', () => {
      // Purpose: Test handling of empty string fields
      const input = {
        address: '',
        district: '',
        state: '',
        city: '',
        country: '',
      }
      const expected = {
        address: '',
        district: '',
        state: '',
        city: '',
        country: '',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests empty address check; returns input unchanged
    })
  })

  // 10.6: Null input
  describe('when input is null', () => {
    test('returns null', () => {
      // Purpose: Test handling of null input
      const input = null
      const expected = null
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests !location condition; returns null unchanged
    })
  })

  // 10.7: Missing address field
  describe('when address field is missing', () => {
    test('returns input unchanged', () => {
      // Purpose: Test handling of missing address field
      const input = {
        district: 'Thanh Xuan',
        state: 'Hanoi',
        city: 'Hanoi',
        country: 'Vietnam',
      }
      const expected = {
        district: 'Thanh Xuan',
        state: 'Hanoi',
        city: 'Hanoi',
        country: 'Vietnam',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests !location.address; returns input unchanged
    })
  })

  // 10.8: Address without District or Province
  describe('when address does not contain District or Province', () => {
    test('falls back to empty district and state', () => {
      // Purpose: Test regex non-match for district and state
      const input = {
        address: '123 Main St',
        city: 'Tokyo',
        country: 'Japan',
      }
      const expected = {
        address: '123 Main St',
        district: '',
        state: '',
        city: 'tokyo',
        country: 'japan',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests regex failure; district/state empty; normalizes city/country
    })
  })

  // 10.19: Null address field
  describe('when address field is null', () => {
    test('returns input unchanged', () => {
      // Purpose: Test handling of null address field
      const input = {
        address: null,
        district: 'Thanh Xuan',
        state: 'Hanoi',
        city: 'Hanoi',
        country: 'Vietnam',
      }
      const expected = {
        address: null,
        district: 'Thanh Xuan',
        state: 'Hanoi',
        city: 'Hanoi',
        country: 'Vietnam',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests !location.address with null; returns input unchanged
    })
  })

  // 10.10: Non-string district field
  describe('when district field is non-string', () => {
    test('converts district to string and normalizes', () => {
      // Purpose: Test type coercion in removeDiacritics
      const input = {
        address: 'Thanh Xuan District',
        district: 123,
        state: 'Hanoi',
        city: 'Hanoi',
        country: 'Vietnam',
      }
      const expected = {
        address: 'Thanh Xuan District',
        district: '123',
        state: 'hanoi',
        city: 'hanoi',
        country: 'vietnam',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests removeDiacritics with non-string; number becomes string
    })
  })

  // 10.11: Complex diacritics in fields
  describe('when fields contain complex diacritics', () => {
    test('correctly removes diacritics', () => {
      // Purpose: Test removeDiacritics with complex diacritics
      const input = {
        address: 'São Paulo District, São Paulo Province',
        district: 'São Paulo',
        state: 'São Paulo',
        city: 'São Paulo',
        country: 'Brasil',
      }
      const expected = {
        address: 'São Paulo District, São Paulo Province',
        district: 'sao paulo',
        state: 'sao paulo',
        city: 'sao paulo',
        country: 'brasil',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests removeDiacritics with varied diacritics; ensures Unicode handling
    })
  })

  // 10.12: Only address provided
  describe('when only address is provided', () => {
    test('extracts district and state, normalizes empty fields', () => {
      // Purpose: Test minimal input with address only
      const input = {
        address: 'Thanh Xuan District, Hanoi Province',
      }
      const expected = {
        address: 'Thanh Xuan District, Hanoi Province',
        district: 'thanh xuan',
        state: 'hanoi',
        city: '',
        country: '',
      }
      expect(extractLocationDetails(input)).toEqual(expected)
      // Comment: Tests regex extraction; normalizes empty city/country
    })
  })
})
