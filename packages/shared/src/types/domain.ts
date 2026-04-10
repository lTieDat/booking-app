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
  numberOfAdults?: number;
  numberOfChildren?: number;
  review?: {
    reviewText?: string;
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
  token?: string;
  fullName?: string;
  avatar?: string;
  hotel_id?: string[];
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
