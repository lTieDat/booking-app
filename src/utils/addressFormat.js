const removeDiacritics = (str) => {
  return str
    .normalize('NFD') // Canonical Decomposition
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase() // Convert to lowercase
}

function extractLocationDetails(location) {
  // testcase: DatLT - AddressFormatting_NullInput_Fail (AF10.4)
  // testcase: DatLT - AddressFormatting_Null_Fail (AF10.6)
  // testcase: DatLT - AddressFormatting_NullAddress_Success (AF10.9)
  // testcase: DatLT - AddressFormatting_MissingAddress_Success (AF10.7)
  if (!location || !location.address) return location

  const { address, district, state, city, country } = location

  const extractFromAddress = (pattern, fallback) => {
    const match = address.match(pattern)
    return match ? match[1].trim() : fallback
  }

  const districtPattern = /(.+?)\s+(District|district)\b/i
  const statePattern = /(.+?)\s+(Province|province)\b/i

  // testcase: DatLT - AddressFormatting_AllFields_Success (AF10.1)
  // testcase: DatLT - AddressFormatting_MissingStreet_Success (AF10.2)
  // testcase: DatLT - AddressFormatting_MissingCountry_Success (AF10.3)
  // testcase: DatLT - AddressFormatting_NoDistrict_Success (AF10.8)
  // testcase: DatLT - AddressFormatting_NonStringDistrict_Success (AF10.10)
  // testcase: DatLT - AddressFormatting_ComplexDiacritics_Success (AF10.11)
  // testcase: DatLT - AddressFormatting_OnlyAddress_Success (AF10.12)
  const extractedDistrict = removeDiacritics(district || extractFromAddress(districtPattern, district || ''))
  const extractedState = removeDiacritics(state || extractFromAddress(statePattern, state || ''))
  const normalizedCity = removeDiacritics(city || '')
  const normalizedCountry = removeDiacritics(country || '')

  return {
    ...location,
    district: extractedDistrict,
    state: extractedState,
    city: normalizedCity,
    country: normalizedCountry,
  }
}

export default extractLocationDetails
