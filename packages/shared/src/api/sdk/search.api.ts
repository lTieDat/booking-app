import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { ContentType, type PagedResponse } from '../generated/booking-api';
import type { SpringApiClient } from '../spring-client';
import type { BookingSearch, Hotel } from '../../types/domain';

interface HotelSearchResponse {
  id?: string;
  name?: string;
  description?: string;
  location?: {
    country?: string;
    city?: string;
    province?: string;
    district?: string;
    detail?: string;
    latitude?: number;
    longitude?: number;
  };
  previewImage?: {
    url?: string;
    altText?: string;
  };
  distanceKm?: number;
  ratingAvg?: number;
  reviewCount?: number;
  minPrice?: number;
}

export class SearchApi {
  constructor(private readonly client: SpringApiClient) {}

  results(search: BookingSearch) {
    return queryOptions({
      queryKey: ['search', 'results', search],
      queryFn: async ({ signal }) => {
        if (!search.lat || !search.lng || !search.startDate || !search.endDate) {
          return [] as Hotel[];
        }

        const response = await this.client.request<PagedResponse>({
          path: '/api/hotels/search',
          method: 'POST',
          type: ContentType.Json,
          format: 'json',
          signal,
          body: {
            latitude: Number(search.lat),
            longitude: Number(search.lng),
            checkIn: search.startDate,
            checkOut: search.endDate,
            adults: search.adults,
            children: search.children,
            roomCount: search.rooms,
            page: 0,
            size: 30,
            keyword: search.propertyName || undefined,
          },
        });

        return ((response.data.content ?? []) as HotelSearchResponse[]).map(mapSearchHotel);
      },
      placeholderData: keepPreviousData,
    });
  }
}

function mapSearchHotel(hotel: HotelSearchResponse): Hotel {
  return {
    id: hotel.id,
    HotelId: hotel.id,
    HotelName: hotel.name,
    Description: hotel.description,
    Rating: Number(hotel.ratingAvg ?? 0),
    LowestPrice: Number(hotel.minPrice ?? 0),
    HighestPrice: Number(hotel.minPrice ?? 0),
    NumberOfRooms: 0,
    images: hotel.previewImage?.url ? { imgSource: hotel.previewImage.url, url: hotel.previewImage.url } : undefined,
    Images: hotel.previewImage?.url ? [{ imgSource: hotel.previewImage.url, url: hotel.previewImage.url }] : [],
    Address: {
      StreetAddress: hotel.location?.detail,
      City: hotel.location?.city,
      Country: hotel.location?.country,
    },
    Location: {
      coordinates:
        typeof hotel.location?.longitude === 'number' && typeof hotel.location?.latitude === 'number'
          ? [hotel.location.longitude, hotel.location.latitude]
          : undefined,
    },
    distanceKm: Number(hotel.distanceKm ?? 0),
    reviewCount: Number(hotel.reviewCount ?? 0),
  };
}
