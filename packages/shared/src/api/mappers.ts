import type {
  BookingResponse,
  HotelResponse,
  InvoiceResponse,
  PaymentResponse,
  PagedResponse,
  ReceptionistHotelResponse,
  ReviewResponse,
  RoomResponse,
  RoomTypeResponse,
  UserSummary,
} from './generated/booking-api';
import type { BookingRecord, Hotel, HotelRoom, InvoiceRecord, ManagerProfile, PaymentRecord, UserProfile } from '../types/domain';

export function springData<T>(response: { data: T }) {
  return response.data;
}

export function pageContent<T>(page?: PagedResponse): T[] {
  return (page?.content ?? []) as T[];
}

export function mapUserSummaryToProfile(summary: UserSummary, token?: string): UserProfile {
  return {
    _id: summary.id,
    token,
    userName: summary.username,
    fullName: summary.name ?? summary.username,
    email: summary.username,
  };
}

export function mapUserSummaryToManagerProfile(summary: UserSummary, token?: string): ManagerProfile {
  return {
    id: summary.id,
    token,
    username: summary.username,
    name: summary.name,
    fullName: summary.name ?? summary.username,
    hotel_id: [],
  };
}

export function mapHotelResponseToHotel(hotel: HotelResponse | ReceptionistHotelResponse, rooms: HotelRoom[] = []): Hotel {
  const previewUrl = hotel.previewImage?.url;
  return {
    id: hotel.id,
    HotelId: hotel.id,
    HotelName: hotel.name,
    Description: hotel.description,
    images: previewUrl ? { imgSource: previewUrl, url: previewUrl } : undefined,
    Images: previewUrl ? [{ imgSource: previewUrl, url: previewUrl }] : [],
    Rooms: rooms,
    Address: {
      StreetAddress: hotel.location?.detail,
      City: hotel.location?.city,
      Country: hotel.location?.country,
    },
    NumberOfRooms: rooms.length,
    LowestPrice: getPriceRange(rooms).lowest,
    HighestPrice: getPriceRange(rooms).highest,
    Rating: 0,
  };
}

export function mapRoomTypeToHotelRoom(roomType: RoomTypeResponse): HotelRoom {
  return {
    RoomId: roomType.id,
    roomId: roomType.id,
    roomTypeId: roomType.id,
    RoomType: roomType.name,
    Description: roomType.description,
    BaseRate: Number(roomType.basePrice ?? 0),
    BedOptions: roomType.bedType,
    MaxOccupancy: roomType.maxOccupancy,
    RoomTags: (roomType.amenities ?? []).map((amenity) => amenity.name).filter(Boolean) as string[],
  };
}

export function mapRoomResponseToHotelRoom(room: RoomResponse): HotelRoom {
  return {
    RoomId: room.id,
    roomId: room.id,
    roomTypeId: room.roomTypeId,
    RoomType: room.roomTypeName,
    Description: [room.roomTypeCode, room.status].filter(Boolean).join(' - '),
    BaseRate: 0,
    MaxOccupancy: 0,
    RoomTags: [room.isActive ? 'Active' : 'Inactive'].filter(Boolean),
  };
}

export function mapBookingResponseToRecord(booking: BookingResponse, hotel?: Hotel): BookingRecord {
  const guestName = [booking.guest?.firstName, booking.guest?.middleName, booking.guest?.lastName]
    .filter(Boolean)
    .join(' ');
  return {
    _id: booking.id,
    bookingId: booking.id,
    hotelId: hotel?.HotelId,
    hotelName: hotel?.HotelName,
    customerName: guestName || 'Guest',
    customerEmail: booking.guest?.email,
    status: booking.status,
    totalAmount: Number(booking.totalPrice ?? 0),
    originalPrice: Number(booking.totalPrice ?? 0) + Number(booking.discountAmount ?? 0),
    discountAmount: Number(booking.discountAmount ?? 0),
    cancellationFee: Number(booking.cancellationFee ?? 0),
    currency: booking.currency,
    checkInDate: booking.checkInDateTime,
    checkOutDate: booking.checkOutDateTime,
    checkInDateTime: booking.checkInDateTime,
    checkOutDateTime: booking.checkOutDateTime,
    guest: booking.guest,
    rooms: (booking.bookedRooms ?? []).map((room) => ({
      roomId: room.roomTypeId ?? room.id ?? '',
    })),
    review: 'no reviews',
  };
}

export function mapPaymentResponseToRecord(payment: PaymentResponse): PaymentRecord {
  return {
    paymentId: payment.paymentId,
    bookingId: payment.bookingId,
    provider: payment.provider,
    status: payment.status,
    amountMinor: payment.amountMinor,
    currency: payment.currency,
    orderCode: payment.orderCode,
    paymentLinkId: payment.paymentLinkId,
    checkoutUrl: payment.checkoutUrl,
    qrCode: payment.qrCode,
    expiresAt: payment.expiresAt,
    paidAt: payment.paidAt,
    cancelledAt: payment.cancelledAt,
  };
}

export function mapInvoiceResponseToRecord(invoice: InvoiceResponse): InvoiceRecord {
  return {
    id: invoice.id,
    bookingId: invoice.bookingId,
    paymentId: invoice.paymentId,
    invoiceNo: invoice.invoiceNo,
    status: invoice.status,
    subtotalMinor: invoice.subtotalMinor,
    discountMinor: invoice.discountMinor,
    taxMinor: invoice.taxMinor,
    totalMinor: invoice.totalMinor,
    currency: invoice.currency,
    issuedAt: invoice.issuedAt,
    paidAt: invoice.paidAt,
    lines: invoice.lines,
    taxes: invoice.taxes,
  };
}

export function mapReviewToBookingReview(review?: ReviewResponse): BookingRecord['review'] {
  if (!review) return 'no reviews';
  return {
    id: review.id,
    title: review.title,
    reviewText: review.comment,
    comment: review.comment,
    rating: review.rating,
  };
}

function getPriceRange(rooms: HotelRoom[]) {
  const prices = rooms.map((room) => room.BaseRate ?? 0).filter((price) => price > 0);
  return {
    lowest: prices.length ? Math.min(...prices) : 0,
    highest: prices.length ? Math.max(...prices) : 0,
  };
}
