export interface GooglePlaceSuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface GooglePlaceSelection extends GooglePlaceSuggestion {
  city: string;
  country: string;
  lat: string;
  lng: string;
}

type AutocompletePrediction = {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
};

type PlaceDetails = {
  address_components?: Array<{
    long_name: string;
    types: string[];
  }>;
  formatted_address?: string;
  name?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
};

type GooglePlacesApi = {
  maps?: {
    places?: {
      AutocompleteService: new () => {
        getPlacePredictions: (
          request: { input: string; types?: string[] },
          callback: (predictions: AutocompletePrediction[] | null, status: string) => void
        ) => void;
      };
      PlacesService: new (node: HTMLElement) => {
        getDetails: (
          request: { placeId: string; fields: string[] },
          callback: (place: PlaceDetails | null, status: string) => void
        ) => void;
      };
    };
  };
};

declare global {
  interface Window {
    google?: GooglePlacesApi;
    __bookingGoogleMapsPromise?: Promise<GooglePlacesApi>;
  }
}

const GOOGLE_MAPS_SCRIPT_ID = 'booking-google-maps-places';

export async function fetchPlaceSuggestions(input: string): Promise<GooglePlaceSuggestion[]> {
  if (input.trim().length < 2) return [];
  const google = await loadGooglePlaces();
  const AutocompleteService = google.maps?.places?.AutocompleteService;
  if (!AutocompleteService) return [];

  const service = new AutocompleteService();
  return new Promise((resolve) => {
    service.getPlacePredictions({ input, types: ['geocode'] }, (predictions, status) => {
      if (status !== 'OK' || !predictions) {
        resolve([]);
        return;
      }
      resolve(
        predictions.slice(0, 5).map((prediction) => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText: prediction.structured_formatting?.main_text ?? prediction.description,
          secondaryText: prediction.structured_formatting?.secondary_text ?? '',
        }))
      );
    });
  });
}

export async function resolvePlaceSuggestion(suggestion: GooglePlaceSuggestion): Promise<GooglePlaceSelection | null> {
  const google = await loadGooglePlaces();
  const PlacesService = google.maps?.places?.PlacesService;
  if (!PlacesService) return null;

  const service = new PlacesService(document.createElement('div'));
  return new Promise((resolve) => {
    service.getDetails(
      {
        placeId: suggestion.placeId,
        fields: ['address_components', 'formatted_address', 'geometry', 'name'],
      },
      (place, status) => {
        const location = place?.geometry?.location;
        if (status !== 'OK' || !place || !location) {
          resolve(null);
          return;
        }

        const city = getAddressComponent(place, ['locality', 'administrative_area_level_1']) || place.name || suggestion.mainText;
        const country = getAddressComponent(place, ['country']) || suggestion.secondaryText || place.formatted_address || '';
        resolve({
          ...suggestion,
          description: place.formatted_address ?? suggestion.description,
          city,
          country,
          lat: String(location.lat()),
          lng: String(location.lng()),
        });
      }
    );
  });
}

async function loadGooglePlaces() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GOOGLE_MAPS_API_KEY is required for destination suggestions');
  }

  if (window.google?.maps?.places) {
    return window.google;
  }

  if (window.__bookingGoogleMapsPromise) {
    return window.__bookingGoogleMapsPromise;
  }

  window.__bookingGoogleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google ?? {}));
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Google Maps Places API')));
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve(window.google ?? {}));
    script.addEventListener('error', () => reject(new Error('Unable to load Google Maps Places API')));
    document.head.appendChild(script);
  });

  return window.__bookingGoogleMapsPromise;
}

function getAddressComponent(place: PlaceDetails, types: string[]) {
  return place.address_components?.find((component) => types.some((type) => component.types.includes(type)))?.long_name ?? '';
}
