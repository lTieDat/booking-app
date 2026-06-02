export interface HotelImage {
  imgSource?: string;
  url?: string;
}

export interface HotelAddress {
  StreetAddress?: string;
  City?: string;
  Country?: string;
}

export interface HotelLocation {
  coordinates?: [number, number];
}

export interface HotelRoom {
  RoomId?: string | number;
  roomId?: string | number;
  roomTypeId?: string;
  RoomType?: string;
  Description?: string;
  BaseRate?: number;
  BedOptions?: string;
  MaxOccupancy?: number;
  RoomTags?: string[];
  Images?: {
    url?: string;
  };
}

export interface Hotel {
  id?: string;
  HotelId?: string;
  HotelName?: string;
  Description?: string;
  Rating?: number;
  LowestPrice?: number;
  HighestPrice?: number;
  NumberOfRooms?: number;
  distanceKm?: number;
  reviewCount?: number;
  images?: HotelImage;
  Images?: HotelImage[];
  Rooms?: HotelRoom[];
  Address?: HotelAddress;
  Location?: HotelLocation;
}

export interface BookingSearch {
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  rooms: number;
  lat?: string;
  lng?: string;
  propertyName?: string;
  roomTags?: string;
}

export interface BookingRecord {
  _id?: string;
  bookingId?: string;
  paymentId?: string;
  invoiceId?: string;
  hotelId?: string;
  hotelName?: string;
  userId?: string;
  customerName?: string;
  customerEmail?: string;
  status?: string;
  totalAmount?: number;
  originalPrice?: number;
  checkInDate?: string;
  checkOutDate?: string;
  checkInDateTime?: string;
  checkOutDateTime?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  discountAmount?: number;
  cancellationFee?: number;
  currency?: string;
  guest?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    identifyCardNo?: string;
    phoneNumber?: string;
    email?: string;
  };
  review?: {
    id?: string;
    title?: string;
    reviewText?: string;
    comment?: string;
    rating?: number;
  } | 'no reviews';
  rooms?: Array<{
    roomId: string;
  }>;
}

export interface UserProfile {
  _id?: string;
  token?: string;
  email?: string;
  userName?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

export interface ManagerProfile {
  id?: string;
  username?: string;
  name?: string;
  token?: string;
  fullName?: string;
  avatar?: string;
  hotel_id?: string[];
}

export interface PaymentRecord {
  paymentId?: string;
  bookingId?: string;
  provider?: string;
  status?: string;
  amountMinor?: number;
  currency?: string;
  orderCode?: string;
  paymentLinkId?: string;
  checkoutUrl?: string;
  qrCode?: string;
  expiresAt?: string;
  paidAt?: string;
  cancelledAt?: string;
}

export interface InvoiceRecord {
  id?: string;
  bookingId?: string;
  paymentId?: string;
  invoiceNo?: string;
  status?: string;
  subtotalMinor?: number;
  discountMinor?: number;
  taxMinor?: number;
  totalMinor?: number;
  currency?: string;
  issuedAt?: string;
  paidAt?: string;
  lines?: Array<{
    id?: string;
    lineType?: string;
    description?: string;
    quantity?: number;
    unitMinor?: number;
    totalMinor?: number;
  }>;
  taxes?: Array<{
    id?: string;
    taxName?: string;
    applyType?: string;
    rate?: number;
    amountMinor?: number;
    inclusive?: boolean;
  }>;
}

export interface AdminConfigData {
  discounts: unknown[];
  cancellationPolicies: unknown[];
  taxConfigs: unknown[];
  assignments: unknown[];
}

export interface PrefixOption {
  code: string;
  name: string;
  dial_code: string;
}

export interface DashboardRevenue {
  hotelId: string;
  totalRevenue: number;
}

export interface DashboardData {
  totalBookings: number;
  pendingBookings: number;
  paidBookings: number;
  confirmedBookings: number;
  totalRevenue: DashboardRevenue[];
}

export interface HotelStatistics {
  hotel: {
    Name?: string;
  };
  totalBookings: number;
  totalOccupancy: number;
  totalRevenue: number;
  averageStayDuration: number;
  customerCountByCountry: Record<string, number>;
}
