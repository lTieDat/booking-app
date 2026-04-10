export interface BookingInput {
  location?: {
    country?: unknown;
  } | null;
  booking?: {
    startDate?: unknown;
    endDate?: unknown;
    adults?: unknown;
    rooms?: unknown;
  } | null;
}

export interface BookingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

function isBlank(value: unknown) {
  return typeof value !== 'string' || value.trim() === '';
}

function isValidDate(value: unknown) {
  return typeof value === 'string' && value.trim() !== '' && !Number.isNaN(new Date(value).getTime());
}

function isValidPositiveInteger(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export function checkInputBooking(booking: BookingInput | null | undefined): BookingValidationResult {
  if (!booking) {
    return {
      isValid: false,
      errors: {
        location: 'Please select a valid location',
        startDate: 'Please select a valid start date',
        endDate: 'Please select a valid end date',
        adults: 'Please select at least one adult',
        rooms: 'Please select at least one room',
      },
    };
  }

  const errors: Record<string, string> = {};
  const country = booking.location?.country;

  if (!booking.location) {
    errors.location = 'Please select a valid location';
  } else if (country === undefined) {
    errors.location = 'Please select a valid country or location';
  } else if (typeof country !== 'string') {
    return {
      isValid: false,
      errors: {
        location: 'Please select a valid location',
      },
    };
  } else if (isBlank(country)) {
    errors.location = 'Please select a valid location';
  }

  if (!booking.booking) {
    return {
      isValid: false,
      errors: {
        ...errors,
        date: 'Please select a valid date range',
        adults: 'Please select at least one adult',
        rooms: 'Please select at least one room',
      },
    };
  }

  const { startDate, endDate, adults, rooms } = booking.booking;

  const startDateMissing = startDate == null || startDate === '';
  const endDateMissing = endDate == null || endDate === '';

  if (startDateMissing && endDateMissing) {
    errors.date = 'Please select a valid date range';
  } else if (startDateMissing) {
    return {
      isValid: false,
      errors: {
        ...errors,
        date: 'Please select a checkin date',
      },
    };
  } else if (endDateMissing && isValidDate(startDate)) {
    return {
      isValid: false,
      errors: {
        ...errors,
        date: 'Please select a checkout date',
      },
    };
  } else {
    const startDateValid = isValidDate(startDate);
    const endDateValid = isValidDate(endDate);

    if (!startDateValid) {
      errors.startDate = 'Please select a valid start date';
    }

    if (!endDateValid) {
      errors.endDate = 'Please select a valid end date';
    }

    if (startDateValid && endDateValid) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      if (end < start) {
        errors.endDate = 'End date must be on or after start date';
      }
    }
  }

  if (!isValidPositiveInteger(adults)) {
    errors.adults = 'Please select at least one adult';
  }

  if (!isValidPositiveInteger(rooms)) {
    errors.rooms = 'Please select at least one room';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
