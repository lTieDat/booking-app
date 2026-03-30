type NullablePrimitive = string | number | null | undefined;

export interface LocationDetails {
  address?: NullablePrimitive;
  district?: NullablePrimitive;
  state?: NullablePrimitive;
  city?: NullablePrimitive;
  country?: NullablePrimitive;
  [key: string]: unknown;
}

function normalizeText(value: NullablePrimitive) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function extractAddressSegment(address: string, suffix: 'District' | 'district' | 'Province' | 'province') {
  return address
    .split(',')
    .map((segment) => segment.trim())
    .find((segment) => new RegExp(`\\b${suffix}\\b`, 'i').test(segment))
    ?.replace(new RegExp(`\\s+${suffix}\\b`, 'i'), '')
    .trim();
}

export function extractLocationDetails<T extends LocationDetails | null | undefined>(location: T): T {
  if (!location || typeof location.address !== 'string' || location.address.trim() === '') {
    return location;
  }

  const { address, district, state, city, country } = location;

  return {
    ...location,
    district: normalizeText(district ?? extractAddressSegment(address, 'District') ?? ''),
    state: normalizeText(state ?? extractAddressSegment(address, 'Province') ?? ''),
    city: normalizeText(city),
    country: normalizeText(country),
  } as T;
}
