import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { requireSession } from '../../routes/guards';
import type { BookingRecord, DashboardData, Hotel, HotelStatistics } from '../../types/domain';
import type {
  AmenityRequest,
  BookingStatusUpdateRequest,
  CancellationPolicyRequest,
  DiscountRequest,
  HotelRequest,
  ReceptionistAssignmentRequest,
  ReceptionistHotelResponse,
  RefundRequest,
  RoomRequest,
  RoomTypeRequest,
  TaxConfigRequest,
} from '../generated/booking-api';
import { ContentType } from '../generated/booking-api';
import {
  mapBookingResponseToRecord,
  mapHotelResponseToHotel,
  mapRoomResponseToHotelRoom,
  mapRoomTypeToHotelRoom,
  pageContent,
  springData,
} from '../mappers';
import type { SpringApiClient } from '../spring-client';
import { syncSpringAuth } from '../spring-client';

interface DashboardQueryData {
  dashboard: DashboardData;
  hotels: Hotel[];
}

interface ManageBookingsQueryData {
  bookings: BookingRecord[];
}

interface ManagePropertiesQueryData {
  hotels: Hotel[];
}

interface PropertyDetailQueryData {
  hotel: Hotel;
  statistics: HotelStatistics;
  roomTypes: ReturnType<typeof mapRoomTypeToHotelRoom>[];
  rooms: ReturnType<typeof mapRoomResponseToHotelRoom>[];
}

interface ManagerHotelStatsResponse {
  hotelId?: string;
  hotelName?: string;
  totalRooms?: number;
  totalBookings?: number;
  upcomingBookings?: number;
  checkedInBookings?: number;
  completedBookings?: number;
  cancelledBookings?: number;
  totalRevenue?: number;
  averageRating?: number;
  reviewCount?: number;
}

export class AdminApi {
  constructor(private readonly client: SpringApiClient) {}

  dashboard() {
    return queryOptions({
      queryKey: ['admin', 'dashboard'],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        const [hotels, managerStats] = await Promise.all([this.loadHotels(signal), this.loadManagerStats(signal)]);
        const bookings = managerStats ? [] : await this.loadBookingsForHotels(hotels, signal);
        const dashboard = managerStats ? buildDashboardFromManagerStats(managerStats) : buildDashboard(bookings, hotels);
        return { dashboard, hotels } satisfies DashboardQueryData;
      },
    });
  }

  manageBookings() {
    return queryOptions({
      queryKey: ['admin', 'bookings'],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        const hotels = await this.loadHotels(signal);
        const bookings = await this.loadBookingsForHotels(hotels, signal);
        return { bookings } satisfies ManageBookingsQueryData;
      },
    });
  }

  manageProperties() {
    return queryOptions({
      queryKey: ['admin', 'properties'],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        return { hotels: await this.loadHotels(signal) } satisfies ManagePropertiesQueryData;
      },
    });
  }

  propertyDetail(hotelId: string) {
    return queryOptions({
      queryKey: ['admin', 'properties', 'detail', hotelId],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        const [hotelResponse, roomTypesResponse, roomsResponse, bookingsResponse, managerStats] = await Promise.all([
          this.client.api.getHotel(hotelId, { signal }),
          this.client.api.getRoomTypes(hotelId, { signal }),
          this.client.api.getRooms(hotelId, { signal }),
          this.client.api.getHotelBookings(hotelId, { page: 0, size: 100 }, { signal }).catch(() => null),
          this.loadManagerStats(signal),
        ]);
        const roomTypes = springData(roomTypesResponse).map(mapRoomTypeToHotelRoom);
        const rooms = springData(roomsResponse).map(mapRoomResponseToHotelRoom);
        const hotel = mapHotelResponseToHotel(springData(hotelResponse), roomTypes);
        const bookings = bookingsResponse
          ? pageContent<Parameters<typeof mapBookingResponseToRecord>[0]>(springData(bookingsResponse)).map((booking) =>
              mapBookingResponseToRecord(booking, hotel)
            )
          : [];

        return {
          hotel,
          statistics:
            managerStats?.hotelId === hotelId
              ? buildStatisticsFromManagerStats(managerStats)
              : buildStatistics(hotel, bookings),
          roomTypes,
          rooms,
        } satisfies PropertyDetailQueryData;
      },
    });
  }

  bookingConfig() {
    return queryOptions({
      queryKey: ['admin', 'booking-config'],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        const [discounts, cancellationPolicies, taxConfigs, assignments, hotels] = await Promise.all([
          this.client.api.getDiscounts({ page: 0, size: 100 }, { signal }).then((response) => springData(response)),
          this.client.api.getCancellationPolicies({ page: 0, size: 100 }, { signal }).then((response) => springData(response)),
          this.client.api.getTaxConfigs({ signal }).then((response) => springData(response)),
          this.client.api.getAssignments({ page: 0, size: 100 }, { signal }).then((response) => springData(response)),
          this.loadHotels(signal),
        ]);
        return {
          discounts,
          cancellationPolicies,
          taxConfigs,
          assignments,
          hotels,
        };
      },
    });
  }

  reviews() {
    return queryOptions({
      queryKey: ['admin', 'reviews'],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        const hotels = await this.loadHotels(signal);
        const pages = await Promise.all(
          hotels.map((hotel) =>
            hotel.HotelId
              ? this.client.api
                  .getHotelReviews(hotel.HotelId, { page: 0, size: 100 }, { signal })
                  .then((response) => ({ hotel, page: springData(response) }))
                  .catch(() => ({ hotel, page: undefined }))
              : Promise.resolve({ hotel, page: undefined })
          )
        );
        return {
          reviews: pages.flatMap(({ hotel, page }) =>
            pageContent<{
              id?: string;
              bookingId?: string;
              userName?: string;
              rating?: number;
              title?: string;
              comment?: string;
              visible?: boolean;
              createdAt?: string;
            }>(page).map((review) => ({
              ...review,
              hotelId: hotel.HotelId ?? hotel.id,
              hotelName: hotel.HotelName,
            }))
          ),
        };
      },
    });
  }

  frontDesk() {
    return queryOptions({
      queryKey: ['admin', 'front-desk'],
      queryFn: async ({ signal }) => {
        const session = requireSession();
        syncSpringAuth(this.client, session.token);
        const hotels =
          session.role === 'receptionist'
            ? ((springData(await this.client.api.getMyHotels({ signal })) as unknown as ReceptionistHotelResponse[]).map((hotel) =>
                mapHotelResponseToHotel(hotel)
              ) ?? [])
            : await this.loadHotels(signal);
        const confirmed = await this.loadBookingsForHotels(hotels, signal, 'CONFIRMED');
        const checkedIn = await this.loadBookingsForHotels(hotels, signal, 'CHECKED_IN');
        return { hotels, confirmed, checkedIn };
      },
    });
  }

  saveHotel() {
    return mutationOptions({
      mutationKey: ['admin', 'hotel', 'save'],
      mutationFn: async ({ id, data }: { id?: string; data: HotelRequest }) => {
        syncSpringAuth(this.client);
        return springData(id ? await this.client.api.updateHotel(id, data) : await this.client.api.addHotel(data));
      },
    });
  }

  deleteHotel() {
    return mutationOptions({
      mutationKey: ['admin', 'hotel', 'delete'],
      mutationFn: async (id: string) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.deleteHotel(id));
      },
    });
  }

  uploadPreviewImage() {
    return mutationOptions({
      mutationKey: ['admin', 'hotel', 'preview-image'],
      mutationFn: async ({ hotelId, file, altText }: { hotelId: string; file: File; altText?: string }) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.uploadPreviewImage(hotelId, { file }, { altText }));
      },
    });
  }

  saveRoomType() {
    return mutationOptions({
      mutationKey: ['admin', 'room-type', 'save'],
      mutationFn: async ({ hotelId, roomTypeId, data }: { hotelId: string; roomTypeId?: string; data: RoomTypeRequest }) => {
        syncSpringAuth(this.client);
        return springData(
          roomTypeId
            ? await this.client.api.updateRoomType(hotelId, roomTypeId, data)
            : await this.client.api.addRoomType(hotelId, data)
        );
      },
    });
  }

  saveRoom() {
    return mutationOptions({
      mutationKey: ['admin', 'room', 'save'],
      mutationFn: async ({ hotelId, roomId, data }: { hotelId: string; roomId?: string; data: RoomRequest }) => {
        syncSpringAuth(this.client);
        return springData(roomId ? await this.client.api.updateRoom(hotelId, roomId, data) : await this.client.api.addRoom(hotelId, data));
      },
    });
  }

  saveAmenity() {
    return mutationOptions({
      mutationKey: ['admin', 'amenity', 'save'],
      mutationFn: async ({
        hotelId,
        roomTypeId,
        amenityId,
        data,
      }: {
        hotelId: string;
        roomTypeId: string;
        amenityId?: string;
        data: AmenityRequest;
      }) => {
        syncSpringAuth(this.client);
        return springData(
          amenityId
            ? await this.client.api.updateAmenity(hotelId, roomTypeId, amenityId, data)
            : await this.client.api.addAmenity(hotelId, roomTypeId, data)
        );
      },
    });
  }

  saveDiscount() {
    return mutationOptions({
      mutationKey: ['admin', 'discount', 'save'],
      mutationFn: async ({ id, data }: { id?: string; data: DiscountRequest }) => {
        syncSpringAuth(this.client);
        return springData(id ? await this.client.api.updateDiscount(id, data) : await this.client.api.createDiscount(data));
      },
    });
  }

  saveCancellationPolicy() {
    return mutationOptions({
      mutationKey: ['admin', 'cancellation-policy', 'save'],
      mutationFn: async ({ id, data }: { id?: string; data: CancellationPolicyRequest }) => {
        syncSpringAuth(this.client);
        return springData(
          id ? await this.client.api.updateCancellationPolicy(id, data) : await this.client.api.createCancellationPolicy(data)
        );
      },
    });
  }

  saveTaxConfig() {
    return mutationOptions({
      mutationKey: ['admin', 'tax-config', 'save'],
      mutationFn: async ({ id, data }: { id?: string; data: TaxConfigRequest }) => {
        syncSpringAuth(this.client);
        return springData(id ? await this.client.api.updateTaxConfig(id, data) : await this.client.api.createTaxConfig(data));
      },
    });
  }

  assignReceptionist() {
    return mutationOptions({
      mutationKey: ['admin', 'receptionist', 'assign'],
      mutationFn: async (data: ReceptionistAssignmentRequest) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.assignReceptionist(data));
      },
    });
  }

  updateBookingStatus() {
    return mutationOptions({
      mutationKey: ['admin', 'booking', 'status'],
      mutationFn: async ({ bookingId, data }: { bookingId: string; data: BookingStatusUpdateRequest }) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.updateBookingStatus(bookingId, data));
      },
    });
  }

  checkIn() {
    return mutationOptions({
      mutationKey: ['admin', 'booking', 'check-in'],
      mutationFn: async (bookingId: string) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.checkInBooking(bookingId));
      },
    });
  }

  checkOut() {
    return mutationOptions({
      mutationKey: ['admin', 'booking', 'check-out'],
      mutationFn: async (bookingId: string) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.checkOutBooking(bookingId));
      },
    });
  }

  noShow() {
    return mutationOptions({
      mutationKey: ['admin', 'booking', 'no-show'],
      mutationFn: async (bookingId: string) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.markNoShow(bookingId));
      },
    });
  }

  refund() {
    return mutationOptions({
      mutationKey: ['admin', 'payment', 'refund'],
      mutationFn: async ({ paymentId, data }: { paymentId: string; data: RefundRequest }) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.createManualRefund(paymentId, data));
      },
    });
  }

  hideReview() {
    return mutationOptions({
      mutationKey: ['admin', 'review', 'hide'],
      mutationFn: async (reviewId: string) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.hideReview(reviewId));
      },
    });
  }

  private async loadHotels(signal?: AbortSignal) {
    const response = springData(await this.client.api.getAllHotels({ page: 0, size: 100 }, { signal }));
    const hotels = pageContent<Parameters<typeof mapHotelResponseToHotel>[0]>(response);
    const roomTypesByHotel = await Promise.all(
      hotels.map((hotel) =>
        hotel.id
          ? this.client.api.getRoomTypes(hotel.id, { signal }).then((roomTypes) => springData(roomTypes).map(mapRoomTypeToHotelRoom))
          : Promise.resolve([])
      )
    );
    return hotels.map((hotel, index) => mapHotelResponseToHotel(hotel, roomTypesByHotel[index]));
  }

  private async loadManagerStats(signal?: AbortSignal) {
    return this.client
      .request<ManagerHotelStatsResponse>({
        path: '/api/hotels/manager/stats',
        method: 'GET',
        type: ContentType.Json,
        format: 'json',
        secure: true,
        signal,
      })
      .then((response) => response.data)
      .catch(() => null);
  }

  private async loadBookingsForHotels(hotels: Hotel[], signal?: AbortSignal, status?: BookingRecord['status']) {
    const pages = await Promise.all(
      hotels.map((hotel) =>
        hotel.HotelId
          ? this.client.api
              .getHotelBookings(hotel.HotelId, { status: status as never, page: 0, size: 100 }, { signal })
              .then((response) => ({ hotel, page: springData(response) }))
              .catch(() => ({ hotel, page: undefined }))
          : Promise.resolve({ hotel, page: undefined })
      )
    );
    return pages.flatMap(({ hotel, page }) =>
      pageContent<Parameters<typeof mapBookingResponseToRecord>[0]>(page).map((booking) => mapBookingResponseToRecord(booking, hotel))
    );
  }
}

function buildDashboard(bookings: BookingRecord[], hotels: Hotel[]): DashboardData {
  return {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((booking) => booking.status === 'PENDING').length,
    paidBookings: bookings.filter((booking) => ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'].includes(booking.status ?? '')).length,
    confirmedBookings: bookings.filter((booking) => booking.status === 'CONFIRMED').length,
    totalRevenue: hotels.map((hotel) => ({
      hotelId: hotel.HotelId ?? hotel.id ?? '',
      totalRevenue: bookings
        .filter((booking) => booking.hotelId === hotel.HotelId || booking.hotelId === hotel.id || booking.hotelName === hotel.HotelName)
        .reduce((total, booking) => total + (booking.totalAmount ?? 0), 0),
    })),
  };
}

function buildDashboardFromManagerStats(stats: ManagerHotelStatsResponse): DashboardData {
  return {
    totalBookings: stats.totalBookings ?? 0,
    pendingBookings: stats.upcomingBookings ?? 0,
    paidBookings: (stats.checkedInBookings ?? 0) + (stats.completedBookings ?? 0),
    confirmedBookings: stats.upcomingBookings ?? 0,
    totalRevenue: [
      {
        hotelId: stats.hotelId ?? '',
        totalRevenue: Number(stats.totalRevenue ?? 0),
      },
    ],
  };
}

function buildStatisticsFromManagerStats(stats: ManagerHotelStatsResponse): HotelStatistics {
  return {
    hotel: { Name: stats.hotelName },
    totalBookings: stats.totalBookings ?? 0,
    totalOccupancy: stats.totalRooms ?? 0,
    totalRevenue: Number(stats.totalRevenue ?? 0),
    averageStayDuration: 0,
    customerCountByCountry: {
      Upcoming: stats.upcomingBookings ?? 0,
      'Checked in': stats.checkedInBookings ?? 0,
      Completed: stats.completedBookings ?? 0,
      Cancelled: stats.cancelledBookings ?? 0,
      Reviews: stats.reviewCount ?? 0,
    },
  };
}

function buildStatistics(hotel: Hotel, bookings: BookingRecord[]): HotelStatistics {
  const totalRevenue = bookings.reduce((total, booking) => total + (booking.totalAmount ?? 0), 0);
  return {
    hotel: { Name: hotel.HotelName },
    totalBookings: bookings.length,
    totalOccupancy: bookings.reduce((total, booking) => total + (booking.numberOfAdults ?? 0) + (booking.numberOfChildren ?? 0), 0),
    totalRevenue,
    averageStayDuration: 0,
    customerCountByCountry: {},
  };
}
