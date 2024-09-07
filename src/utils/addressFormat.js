const removeDiacritics = (str) => {
  return str
    .normalize("NFD") // Canonical Decomposition
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toLowerCase(); // Convert to lowercase
};

function extractLocationDetails(location) {
  if (!location || !location.address) return location;

  const { address, district, state, city, country } = location;

  const extractFromAddress = (pattern, fallback) => {
    const match = address.match(pattern);
    return match ? match[1].trim() : fallback;
  };

  const districtPattern = /(.+?)\s+(District|district)\b/i;
  const statePattern = /(.+?)\s+(Province|province)\b/i;

  const extractedDistrict = removeDiacritics(
    district || extractFromAddress(districtPattern, district || "")
  );
  const extractedState = removeDiacritics(
    state || extractFromAddress(statePattern, state || "")
  );
  const normalizedCity = removeDiacritics(city || "");
  const normalizedCountry = removeDiacritics(country || "");

  return {
    ...location,
    district: extractedDistrict,
    state: extractedState,
    city: normalizedCity,
    country: normalizedCountry,
  };
}

export default extractLocationDetails;
