/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TaxConfigRequest {
  /** @format uuid */
  hotelId?: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  name: string;
  applyType: "PERCENTAGE" | "FIXED_PER_BOOKING" | "PER_ROOM_PER_NIGHT";
  rate?: number;
  /** @format int64 */
  amountMinor?: number;
  inclusive?: boolean;
  active?: boolean;
}

export interface TaxConfigResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  hotelId?: string;
  name?: string;
  applyType?: string;
  rate?: number;
  /** @format int64 */
  amountMinor?: number;
  inclusive?: boolean;
  active?: boolean;
}

export interface ReviewRequest {
  /**
   * @format int32
   * @min 1
   * @max 5
   */
  rating: number;
  /**
   * @minLength 0
   * @maxLength 100
   */
  title?: string;
  /**
   * @minLength 0
   * @maxLength 1000
   */
  comment?: string;
}

export interface HotelImageRequest {
  /**
   * @minLength 0
   * @maxLength 500
   */
  url: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  bucket?: string;
  /**
   * @minLength 0
   * @maxLength 500
   */
  objectKey?: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  contentType?: string;
  /** @format int64 */
  size?: number;
  /**
   * @minLength 0
   * @maxLength 100
   */
  altText: string;
}

export interface HotelRequest {
  /**
   * @minLength 0
   * @maxLength 100
   */
  name: string;
  description?: string;
  location: LocationRequest;
  previewImage?: HotelImageRequest;
}

export interface LocationRequest {
  /**
   * @minLength 0
   * @maxLength 100
   */
  country: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  city: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  province?: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  district?: string;
  /**
   * @minLength 0
   * @maxLength 250
   */
  detail?: string;
}

export interface HotelImageResponse {
  url?: string;
  bucket?: string;
  objectKey?: string;
  contentType?: string;
  /** @format int64 */
  size?: number;
  altText?: string;
  imageType?: "PREVIEW" | "GALLERY" | "THUMBNAIL";
}

export interface HotelResponse {
  /** @format uuid */
  id?: string;
  name?: string;
  description?: string;
  location?: LocationResponse;
  previewImage?: HotelImageResponse;
}

export interface LocationResponse {
  country?: string;
  city?: string;
  province?: string;
  district?: string;
  detail?: string;
}

export interface RoomRequest {
  /** @format uuid */
  roomTypeId: string;
  /**
   * @minLength 0
   * @maxLength 20
   */
  roomNumber: string;
  /** @format int32 */
  floor?: number;
  status?:
    | "AVAILABLE"
    | "OCCUPIED"
    | "MAINTENANCE"
    | "CLEANING"
    | "OUT_OF_SERVICE";
  isActive?: boolean;
}

export interface RoomResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  hotelId?: string;
  /** @format uuid */
  roomTypeId?: string;
  roomTypeName?: string;
  roomTypeCode?: string;
  roomNumber?: string;
  /** @format int32 */
  floor?: number;
  status?:
    | "AVAILABLE"
    | "OCCUPIED"
    | "MAINTENANCE"
    | "CLEANING"
    | "OUT_OF_SERVICE";
  isActive?: boolean;
}

export interface RoomTypeRequest {
  /**
   * @minLength 0
   * @maxLength 50
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 30
   */
  code: string;
  /**
   * @format int32
   * @min 1
   */
  maxAdults: number;
  /**
   * @format int32
   * @min 0
   */
  maxChildren: number;
  /**
   * @format int32
   * @min 1
   */
  maxOccupancy: number;
  bedType?: "DOUBLE" | "SINGLE";
  /**
   * @minLength 0
   * @maxLength 500
   */
  description?: string;
  basePrice: number;
  isActive?: boolean;
}

export interface AmenityResponse {
  /** @format uuid */
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  /** @format int32 */
  quantity?: number;
  isActive?: boolean;
}

export interface RoomTypeResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  hotelId?: string;
  name?: string;
  code?: string;
  /** @format int32 */
  maxAdults?: number;
  /** @format int32 */
  maxChildren?: number;
  /** @format int32 */
  maxOccupancy?: number;
  bedType?: "DOUBLE" | "SINGLE";
  description?: string;
  basePrice?: number;
  amenities?: AmenityResponse[];
  isActive?: boolean;
}

export interface AmenityRequest {
  /**
   * @minLength 0
   * @maxLength 100
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 300
   */
  description?: string;
  /**
   * @format int32
   * @min 1
   */
  quantity?: number;
  isActive?: boolean;
}

export interface DiscountRequest {
  /**
   * @minLength 0
   * @maxLength 20
   */
  code: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  name: string;
  discountType: "FIXED_AMOUNT" | "PERCENTAGE";
  /**
   * @format int64
   * @min 1
   */
  discountValue: number;
  /**
   * @format int32
   * @min 0
   */
  minOrderValue?: number;
  /**
   * @format int32
   * @min 0
   */
  maxOrderValue?: number;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  active?: boolean;
  /**
   * @format int32
   * @min 1
   */
  maxUsage?: number;
}

export interface CancellationPolicyRequest {
  /** @format uuid */
  hotelId?: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 500
   */
  description?: string;
  /**
   * @format int32
   * @min 0
   */
  freeCancellationHours: number;
  penaltyType: "NONE" | "FIXED_AMOUNT" | "PERCENTAGE";
  /**
   * @format int64
   * @min 0
   */
  penaltyValue: number;
  active?: boolean;
}

export interface ReceptionistAssignmentRequest {
  /** @format uuid */
  userId: string;
  /** @format uuid */
  hotelId: string;
  active?: boolean;
}

export interface ReceptionistAssignmentResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  userId?: string;
  userEmail?: string;
  userName?: string;
  /** @format uuid */
  hotelId?: string;
  hotelName?: string;
  active?: boolean;
}

export interface RefundRequest {
  /**
   * @format int64
   * @min 1
   */
  amountMinor?: number;
  /**
   * @minLength 0
   * @maxLength 300
   */
  reason: string;
}

export interface RefundResponse {
  /** @format uuid */
  refundId?: string;
  /** @format uuid */
  paymentId?: string;
  /** @format uuid */
  bookingId?: string;
  /** @format int64 */
  amountMinor?: number;
  currency?: string;
  status?: string;
  reason?: string;
  /** @format date-time */
  requestedAt?: string;
  /** @format date-time */
  processedAt?: string;
}

export interface Webhook {
  code?: string;
  desc?: string;
  success?: boolean;
  data?: WebhookData;
  signature?: string;
}

export interface WebhookData {
  /** @format int64 */
  orderCode?: number;
  /** @format int64 */
  amount?: number;
  description?: string;
  accountNumber?: string;
  reference?: string;
  transactionDateTime?: string;
  currency?: string;
  paymentLinkId?: string;
  code?: string;
  desc?: string;
  counterAccountBankId?: string;
  counterAccountBankName?: string;
  counterAccountName?: string;
  counterAccountNumber?: string;
  virtualAccountName?: string;
  virtualAccountNumber?: string;
}

export interface UploadFileResponse {
  bucket?: string;
  objectKey?: string;
  url?: string;
  contentType?: string;
  /** @format int64 */
  size?: number;
}

export interface BookedRoomRequest {
  /** @format uuid */
  roomTypeId: string;
  /**
   * @format int32
   * @min 1
   */
  quantity: number;
}

export interface BookingGuestRequest {
  /**
   * @minLength 0
   * @maxLength 40
   */
  firstName: string;
  /**
   * @minLength 0
   * @maxLength 40
   */
  lastName: string;
  /**
   * @minLength 0
   * @maxLength 40
   */
  middleName?: string;
  /**
   * @minLength 0
   * @maxLength 20
   * @pattern ^[A-Za-z0-9]{6,20}$
   */
  identifyCardNo: string;
  /**
   * @minLength 0
   * @maxLength 20
   * @pattern ^\+?[0-9]{8,15}$
   */
  phoneNumber: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  email: string;
}

export interface BookingRequest {
  /** @minItems 1 */
  rooms: BookedRoomRequest[];
  /** @format date-time */
  checkInDate: string;
  /** @format date-time */
  checkOutDate: string;
  guest: BookingGuestRequest;
  discountCode?: string;
  /** @format uuid */
  cancellationPolicyId?: string;
}

export interface BookedRoomResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  roomTypeId?: string;
  /** @format int32 */
  quantity?: number;
  unitPrice?: number;
  roomTypeNameSnapshot?: string;
  roomTypeCodeSnapshot?: string;
  bedTypeSnapshot?: string;
  /** @format int32 */
  maxOccupancySnapshot?: number;
}

export interface BookingResponse {
  /** @format uuid */
  id?: string;
  bookedRooms?: BookedRoomResponse[];
  /** @format date-time */
  checkInDateTime?: string;
  /** @format date-time */
  checkOutDateTime?: string;
  totalPrice?: number;
  discountAmount?: number;
  cancellationFee?: number;
  currency?: string;
  status?: string;
  guest?: GuestResponse;
}

export interface GuestResponse {
  /** @format uuid */
  id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  identifyCardNo?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ReviewResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  bookingId?: string;
  /** @format uuid */
  userId?: string;
  userName?: string;
  /** @format uuid */
  hotelId?: string;
  hotelName?: string;
  /** @format int32 */
  rating?: number;
  title?: string;
  comment?: string;
  visible?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface PaymentResponse {
  /** @format uuid */
  paymentId?: string;
  /** @format uuid */
  bookingId?: string;
  provider?: string;
  status?: string;
  /** @format int64 */
  amountMinor?: number;
  currency?: string;
  orderCode?: string;
  paymentLinkId?: string;
  checkoutUrl?: string;
  qrCode?: string;
  /** @format date-time */
  expiresAt?: string;
  /** @format date-time */
  paidAt?: string;
  /** @format date-time */
  cancelledAt?: string;
}

export interface DiscountResponse {
  /** @format uuid */
  id?: string;
  code?: string;
  name?: string;
  discountType?: "FIXED_AMOUNT" | "PERCENTAGE";
  /** @format int64 */
  discountValue?: number;
  /** @format int32 */
  minOrderValue?: number;
  /** @format int32 */
  maxOrderValue?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  active?: boolean;
  /** @format int32 */
  maxUsage?: number;
  /** @format int32 */
  usedCount?: number;
}

export interface CancellationPolicyResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  hotelId?: string;
  hotelName?: string;
  name?: string;
  description?: string;
  /** @format int32 */
  freeCancellationHours?: number;
  penaltyType?: "NONE" | "FIXED_AMOUNT" | "PERCENTAGE";
  /** @format int64 */
  penaltyValue?: number;
  active?: boolean;
}

export interface SignUpRequest {
  /**
   * @minLength 4
   * @maxLength 40
   */
  name: string;
  /**
   * @minLength 3
   * @maxLength 15
   */
  username: string;
  /**
   * @minLength 0
   * @maxLength 40
   */
  email: string;
  /**
   * @minLength 6
   * @maxLength 20
   */
  password: string;
}

export interface ApiMessageResponse {
  success?: boolean;
  message?: string;
}

export interface LoginRequest {
  /** @minLength 1 */
  usernameOrEmail: string;
  /** @minLength 1 */
  password: string;
}

export interface JwtAuthResponse {
  accessToken?: string;
  tokenType?: string;
}

export interface OtpRequest {
  /** @minLength 1 */
  email: string;
}

export interface OtpTokenResponse {
  email?: string;
  purpose?: "EMAIL_VERIFICATION" | "PASSWORD_RESET";
  token?: string;
  /** @format date-time */
  expiresAt?: string;
}

export interface PasswordResetConfirmRequest {
  /** @minLength 1 */
  email: string;
  /**
   * @minLength 4
   * @maxLength 10
   */
  token: string;
  /**
   * @minLength 6
   * @maxLength 20
   */
  newPassword: string;
}

export interface OtpVerifyRequest {
  /** @minLength 1 */
  email: string;
  /**
   * @minLength 4
   * @maxLength 10
   */
  token: string;
}

export interface BookingStatusUpdateRequest {
  status:
    | "PENDING"
    | "CONFIRMED"
    | "CHECKED_IN"
    | "CHECKED_OUT"
    | "CANCELLED"
    | "REFUNDED"
    | "NO_SHOW"
    | "EXPIRED";
  /**
   * @minLength 0
   * @maxLength 500
   */
  reason?: string;
}

export interface UserProfile {
  /** @format uuid */
  id?: string;
  username?: string;
  name?: string;
  /** @format date-time */
  joinedAt?: string;
}

export interface UserSummary {
  /** @format uuid */
  id?: string;
  username?: string;
  name?: string;
}

export interface UserIdentityAvailability {
  available?: boolean;
}

export interface ReceptionistHotelResponse {
  /** @format uuid */
  id?: string;
  name?: string;
  description?: string;
  location?: LocationResponse;
  previewImage?: HotelImageResponse;
}

export interface PagedResponse {
  content?: any[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  last?: boolean;
}

export interface BookingTaxResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  taxConfigId?: string;
  taxName?: string;
  applyType?: string;
  rate?: number;
  /** @format int64 */
  amountMinor?: number;
  inclusive?: boolean;
}

export interface InvoiceLineResponse {
  /** @format uuid */
  id?: string;
  lineType?: string;
  description?: string;
  /** @format int32 */
  quantity?: number;
  /** @format int64 */
  unitMinor?: number;
  /** @format int64 */
  totalMinor?: number;
  metadata?: string;
}

export interface InvoiceResponse {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  bookingId?: string;
  /** @format uuid */
  paymentId?: string;
  invoiceNo?: string;
  status?: string;
  /** @format int64 */
  subtotalMinor?: number;
  /** @format int64 */
  discountMinor?: number;
  /** @format int64 */
  taxMinor?: number;
  /** @format int64 */
  totalMinor?: number;
  currency?: string;
  /** @format date-time */
  issuedAt?: string;
  /** @format date-time */
  paidAt?: string;
  lines?: InvoiceLineResponse[];
  taxes?: BookingTaxResponse[];
}

export interface CancelBookingRequest {
  /**
   * @minLength 0
   * @maxLength 500
   */
  reason: string;
}

export namespace Api {
  /**
   * @description Admin only.
   * @tags Invoices
   * @name UpdateTaxConfig
   * @summary Update tax config
   * @request PUT:/api/tax-configs/{id}
   * @secure
   */
  export namespace UpdateTaxConfig {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TaxConfigRequest;
    export type RequestHeaders = {};
    export type ResponseBody = TaxConfigResponse;
  }

  /**
   * @description Owner or admin updates a review.
   * @tags Reviews
   * @name UpdateReview
   * @summary Update review
   * @request PUT:/api/reviews/{reviewId}
   * @secure
   */
  export namespace UpdateReview {
    export type RequestParams = {
      /** @format uuid */
      reviewId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReviewRequest;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Owner or admin hides a review from public hotel reviews.
   * @tags Reviews
   * @name HideReview
   * @summary Hide review
   * @request DELETE:/api/reviews/{reviewId}
   * @secure
   */
  export namespace HideReview {
    export type RequestParams = {
      /** @format uuid */
      reviewId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Return a single hotel by its id.
   * @tags Hotels
   * @name GetHotel
   * @summary Get hotel by id
   * @request GET:/api/hotels/{id}
   */
  export namespace GetHotel {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = HotelResponse;
  }

  /**
   * @description Update an existing hotel. Admin only.
   * @tags Hotels
   * @name UpdateHotel
   * @summary Update hotel
   * @request PUT:/api/hotels/{id}
   * @secure
   */
  export namespace UpdateHotel {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = HotelRequest;
    export type RequestHeaders = {};
    export type ResponseBody = HotelResponse;
  }

  /**
   * @description Delete a hotel. Admin only.
   * @tags Hotels
   * @name DeleteHotel
   * @summary Delete hotel
   * @request DELETE:/api/hotels/{id}
   * @secure
   */
  export namespace DeleteHotel {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Return a single room by hotel and room id.
   * @tags Rooms
   * @name GetRoom
   * @summary Get room by id
   * @request GET:/api/hotels/{hotelId}/rooms/{id}
   */
  export namespace GetRoom {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RoomResponse;
  }

  /**
   * @description Update a room. Admin only.
   * @tags Rooms
   * @name UpdateRoom
   * @summary Update room
   * @request PUT:/api/hotels/{hotelId}/rooms/{id}
   * @secure
   */
  export namespace UpdateRoom {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RoomRequest;
    export type RequestHeaders = {};
    export type ResponseBody = RoomResponse;
  }

  /**
   * @description Delete a room. Admin only.
   * @tags Rooms
   * @name DeleteRoom
   * @summary Delete room
   * @request DELETE:/api/hotels/{hotelId}/rooms/{id}
   * @secure
   */
  export namespace DeleteRoom {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Return a single room type by hotel and room type id.
   * @tags Room Types
   * @name GetRoomType
   * @summary Get room type by id
   * @request GET:/api/hotels/{hotelId}/room-types/{roomTypeId}
   */
  export namespace GetRoomType {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RoomTypeResponse;
  }

  /**
   * @description Update a room type. Admin only.
   * @tags Room Types
   * @name UpdateRoomType
   * @summary Update room type
   * @request PUT:/api/hotels/{hotelId}/room-types/{roomTypeId}
   * @secure
   */
  export namespace UpdateRoomType {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RoomTypeRequest;
    export type RequestHeaders = {};
    export type ResponseBody = RoomTypeResponse;
  }

  /**
   * @description Delete a room type. Admin only.
   * @tags Room Types
   * @name DeleteRoomType
   * @summary Delete room type
   * @request DELETE:/api/hotels/{hotelId}/room-types/{roomTypeId}
   * @secure
   */
  export namespace DeleteRoomType {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Return a single amenity by room type and amenity id.
   * @tags Room Types
   * @name GetAmenity
   * @summary Get room type amenity
   * @request GET:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities/{amenityId}
   */
  export namespace GetAmenity {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
      /** @format uuid */
      amenityId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AmenityResponse;
  }

  /**
   * @description Update an amenity for a room type. Admin only.
   * @tags Room Types
   * @name UpdateAmenity
   * @summary Update room type amenity
   * @request PUT:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities/{amenityId}
   * @secure
   */
  export namespace UpdateAmenity {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
      /** @format uuid */
      amenityId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AmenityRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AmenityResponse;
  }

  /**
   * @description Delete an amenity from a room type. Admin only.
   * @tags Room Types
   * @name DeleteAmenity
   * @summary Delete room type amenity
   * @request DELETE:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities/{amenityId}
   * @secure
   */
  export namespace DeleteAmenity {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
      /** @format uuid */
      amenityId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Update a promotion/discount code. Admin only.
   * @tags Booking Config
   * @name UpdateDiscount
   * @summary Update discount
   * @request PUT:/api/booking-config/discounts/{id}
   * @secure
   */
  export namespace UpdateDiscount {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DiscountRequest;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Deactivate a promotion/discount code. Admin only.
   * @tags Booking Config
   * @name DeactivateDiscount
   * @summary Deactivate discount
   * @request DELETE:/api/booking-config/discounts/{id}
   * @secure
   */
  export namespace DeactivateDiscount {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Update a cancellation policy. Admin only.
   * @tags Booking Config
   * @name UpdateCancellationPolicy
   * @summary Update cancellation policy
   * @request PUT:/api/booking-config/cancellation-policies/{id}
   * @secure
   */
  export namespace UpdateCancellationPolicy {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CancellationPolicyRequest;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Deactivate a cancellation policy. Admin only.
   * @tags Booking Config
   * @name DeactivateCancellationPolicy
   * @summary Deactivate cancellation policy
   * @request DELETE:/api/booking-config/cancellation-policies/{id}
   * @secure
   */
  export namespace DeactivateCancellationPolicy {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Admin only.
   * @tags Invoices
   * @name GetTaxConfigs
   * @summary List tax configs
   * @request GET:/api/tax-configs
   * @secure
   */
  export namespace GetTaxConfigs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Admin only.
   * @tags Invoices
   * @name CreateTaxConfig
   * @summary Create tax config
   * @request POST:/api/tax-configs
   * @secure
   */
  export namespace CreateTaxConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaxConfigRequest;
    export type RequestHeaders = {};
    export type ResponseBody = TaxConfigResponse;
  }

  /**
   * @description Admin lists receptionist hotel assignments.
   * @tags Receptionist
   * @name GetAssignments
   * @summary List receptionist assignments
   * @request GET:/api/receptionist/assignments
   * @secure
   */
  export namespace GetAssignments {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format uuid */
      userId?: string;
      /** @format uuid */
      hotelId?: string;
      active?: boolean;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PagedResponse;
  }

  /**
   * @description Admin assigns a user to a hotel and grants `ROLE_RECEPTIONIST` if the user does not already have it.
   * @tags Receptionist
   * @name AssignReceptionist
   * @summary Assign receptionist to hotel
   * @request POST:/api/receptionist/assignments
   * @secure
   */
  export namespace AssignReceptionist {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReceptionistAssignmentRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ReceptionistAssignmentResponse;
  }

  /**
   * @description Create a manual refund record for a paid payment. This does not call a payOS refund API.
   * @tags Payments
   * @name CreateManualRefund
   * @summary Create manual refund
   * @request POST:/api/payments/{paymentId}/refunds
   * @secure
   */
  export namespace CreateManualRefund {
    export type RequestParams = {
      /** @format uuid */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RefundRequest;
    export type RequestHeaders = {};
    export type ResponseBody = RefundResponse;
  }

  /**
   * @description Verify and process payOS payment webhook. This endpoint is public but signature-verified.
   * @tags payOS Webhooks
   * @name HandleWebhook
   * @summary Receive payOS webhook
   * @request POST:/api/payments/payos/webhook
   */
  export namespace HandleWebhook {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Webhook;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description Return paginated list of hotels.
   * @tags Hotels
   * @name GetAllHotels
   * @summary Get all hotels
   * @request GET:/api/hotels
   */
  export namespace GetAllHotels {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page index starting from 0
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * Page size
       * @format int32
       * @default 30
       */
      size?: number;
      /** Hotel Name, Location or Landmark */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PagedResponse;
  }

  /**
   * @description Create a new hotel. Admin only.
   * @tags Hotels
   * @name AddHotel
   * @summary Create hotel
   * @request POST:/api/hotels
   * @secure
   */
  export namespace AddHotel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = HotelRequest;
    export type RequestHeaders = {};
    export type ResponseBody = HotelResponse;
  }

  /**
   * @description Upload a preview image to object storage and attach it to the hotel. Admin only.
   * @tags Hotels
   * @name UploadPreviewImage
   * @summary Upload hotel preview image
   * @request POST:/api/hotels/{id}/preview-image
   * @secure
   */
  export namespace UploadPreviewImage {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {
      altText?: string;
    };
    export type RequestBody = {
      /** @format binary */
      file: File;
    };
    export type RequestHeaders = {};
    export type ResponseBody = HotelResponse;
  }

  /**
   * @description Delete the preview image metadata and object storage file when available. Admin only.
   * @tags Hotels
   * @name DeletePreviewImage
   * @summary Delete hotel preview image
   * @request DELETE:/api/hotels/{id}/preview-image
   * @secure
   */
  export namespace DeletePreviewImage {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Return all rooms for a hotel.
   * @tags Rooms
   * @name GetRooms
   * @summary Get rooms by hotel
   * @request GET:/api/hotels/{hotelId}/rooms
   */
  export namespace GetRooms {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RoomResponse[];
  }

  /**
   * @description Create a new room for a hotel. Admin only.
   * @tags Rooms
   * @name AddRoom
   * @summary Create room
   * @request POST:/api/hotels/{hotelId}/rooms
   * @secure
   */
  export namespace AddRoom {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RoomRequest;
    export type RequestHeaders = {};
    export type ResponseBody = RoomResponse;
  }

  /**
   * @description Return all room types for a hotel.
   * @tags Room Types
   * @name GetRoomTypes
   * @summary Get room types by hotel
   * @request GET:/api/hotels/{hotelId}/room-types
   */
  export namespace GetRoomTypes {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RoomTypeResponse[];
  }

  /**
   * @description Create a new room type for a hotel. Admin only.
   * @tags Room Types
   * @name AddRoomType
   * @summary Create room type
   * @request POST:/api/hotels/{hotelId}/room-types
   * @secure
   */
  export namespace AddRoomType {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RoomTypeRequest;
    export type RequestHeaders = {};
    export type ResponseBody = RoomTypeResponse;
  }

  /**
   * @description Return all amenities for a room type.
   * @tags Room Types
   * @name GetAmenities
   * @summary Get room type amenities
   * @request GET:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities
   */
  export namespace GetAmenities {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AmenityResponse[];
  }

  /**
   * @description Create a new amenity for a room type. Admin only. Amenity code is generated by the backend from the name.
   * @tags Room Types
   * @name AddAmenity
   * @summary Create room type amenity
   * @request POST:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities
   * @secure
   */
  export namespace AddAmenity {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
      /** @format uuid */
      roomTypeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AmenityRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AmenityResponse;
  }

  /**
   * @description Upload a file to object storage and return its metadata.
   * @tags Files
   * @name Upload
   * @summary Upload file
   * @request POST:/api/files/upload
   * @secure
   */
  export namespace Upload {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "hotel-images" */
      folder?: string;
    };
    export type RequestBody = {
      /** @format binary */
      file: File;
    };
    export type RequestHeaders = {};
    export type ResponseBody = UploadFileResponse;
  }

  /**
   * @description Create a new booking for the current authenticated user. Requires `Idempotency-Key` header. Retrying with the same key and identical payload returns the existing booking instead of creating a duplicate.
   * @tags Bookings
   * @name CreateBooking
   * @summary Create booking
   * @request POST:/api/bookings
   * @secure
   */
  export namespace CreateBooking {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BookingRequest;
    export type RequestHeaders = {
      /**
       * Client-generated idempotency key for safe retries. Use a unique UUID/ULID per booking attempt and reuse it only for retries of the exact same payload.
       * @example "01JZ7Q3M2AZR9V6DS6E8Q8XK7A"
       */
      "Idempotency-Key": string;
    };
    export type ResponseBody = BookingResponse;
  }

  /**
   * @description Create one review for a checked-out booking owned by the current user.
   * @tags Reviews
   * @name CreateBookingReview
   * @summary Review booking
   * @request POST:/api/bookings/{bookingId}/review
   * @secure
   */
  export namespace CreateBookingReview {
    export type RequestParams = {
      /** @format uuid */
      bookingId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReviewRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ReviewResponse;
  }

  /**
   * @description Create or reuse an active payOS payment link for a pending booking owned by the current user.
   * @tags Payments
   * @name CreatePayosPayment
   * @summary Create payOS payment link
   * @request POST:/api/bookings/{bookingId}/payments/payos
   * @secure
   */
  export namespace CreatePayosPayment {
    export type RequestParams = {
      /** @format uuid */
      bookingId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaymentResponse;
  }

  /**
   * @description List promotion/discount codes. Admin only.
   * @tags Booking Config
   * @name GetDiscounts
   * @summary List discounts
   * @request GET:/api/booking-config/discounts
   * @secure
   */
  export namespace GetDiscounts {
    export type RequestParams = {};
    export type RequestQuery = {
      active?: boolean;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Create a promotion/discount code. Admin only.
   * @tags Booking Config
   * @name CreateDiscount
   * @summary Create discount
   * @request POST:/api/booking-config/discounts
   * @secure
   */
  export namespace CreateDiscount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountRequest;
    export type RequestHeaders = {};
    export type ResponseBody = DiscountResponse;
  }

  /**
   * @description List cancellation policies. Admin only.
   * @tags Booking Config
   * @name GetCancellationPolicies
   * @summary List cancellation policies
   * @request GET:/api/booking-config/cancellation-policies
   * @secure
   */
  export namespace GetCancellationPolicies {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format uuid */
      hotelId?: string;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Create a cancellation policy. Admin only.
   * @tags Booking Config
   * @name CreateCancellationPolicy
   * @summary Create cancellation policy
   * @request POST:/api/booking-config/cancellation-policies
   * @secure
   */
  export namespace CreateCancellationPolicy {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CancellationPolicyRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CancellationPolicyResponse;
  }

  /**
   * @description Create a new user account with default role assignment.
   * @tags Auth
   * @name RegisterUser
   * @summary Sign up user
   * @request POST:/api/auth/signup
   */
  export namespace RegisterUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SignUpRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Authenticate an existing user and return a JWT access token. Local/dev default receptionist: email reception@booking.local, password admin123.
   * @tags Auth
   * @name AuthenticateUser
   * @summary Sign in as user
   * @request POST:/api/auth/signin
   */
  export namespace AuthenticateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequest;
    export type RequestHeaders = {};
    export type ResponseBody = JwtAuthResponse;
  }

  /**
   * @description Generate an OTP token for resetting a password.
   * @tags Auth
   * @name RequestPasswordReset
   * @summary Request password reset OTP
   * @request POST:/api/auth/otp/password-reset/request
   */
  export namespace RequestPasswordReset {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtpRequest;
    export type RequestHeaders = {};
    export type ResponseBody = OtpTokenResponse;
  }

  /**
   * @description Confirm the OTP token and update the account password.
   * @tags Auth
   * @name ResetPassword
   * @summary Confirm password reset OTP
   * @request POST:/api/auth/otp/password-reset/confirm
   */
  export namespace ResetPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PasswordResetConfirmRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Generate an OTP token for verifying a newly registered email.
   * @tags Auth
   * @name RequestEmailVerification
   * @summary Request email verification OTP
   * @request POST:/api/auth/otp/email-verification/request
   */
  export namespace RequestEmailVerification {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtpRequest;
    export type RequestHeaders = {};
    export type ResponseBody = OtpTokenResponse;
  }

  /**
   * @description Confirm the OTP token and mark the email as verified.
   * @tags Auth
   * @name VerifyEmail
   * @summary Confirm email verification OTP
   * @request POST:/api/auth/otp/email-verification/confirm
   */
  export namespace VerifyEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtpVerifyRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Authenticate a manager account and return a JWT access token. Local/dev default managers: admin@booking.local / admin123 and manager@booking.local / admin123.
   * @tags Auth
   * @name AuthenticateManager
   * @summary Sign in as manager
   * @request POST:/api/auth/manager/signin
   */
  export namespace AuthenticateManager {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequest;
    export type RequestHeaders = {};
    export type ResponseBody = JwtAuthResponse;
  }

  /**
   * @description Move a booking through the allowed status state machine. Admin only.
   * @tags Bookings
   * @name UpdateBookingStatus
   * @summary Update booking status
   * @request PATCH:/api/bookings/{id}/status
   * @secure
   */
  export namespace UpdateBookingStatus {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BookingStatusUpdateRequest;
    export type RequestHeaders = {};
    export type ResponseBody = BookingResponse;
  }

  /**
   * @description Mark a confirmed booking as no-show. Admin or receptionist only. Local/dev receptionist account: reception@booking.local / admin123.
   * @tags Bookings
   * @name MarkNoShow
   * @summary Mark booking as no-show
   * @request PATCH:/api/bookings/{id}/no-show
   * @secure
   */
  export namespace MarkNoShow {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Check-out a checked-in booking. Admin or receptionist only. Local/dev receptionist account: reception@booking.local / admin123.
   * @tags Bookings
   * @name CheckOutBooking
   * @summary Check-out booking
   * @request PATCH:/api/bookings/{id}/check-out
   * @secure
   */
  export namespace CheckOutBooking {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Check-in a confirmed booking. Admin or receptionist only. Local/dev receptionist account: reception@booking.local / admin123.
   * @tags Bookings
   * @name CheckInBooking
   * @summary Check-in booking
   * @request PATCH:/api/bookings/{id}/check-in
   * @secure
   */
  export namespace CheckInBooking {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Return a public profile for a given username.
   * @tags Users
   * @name GetUserProfile
   * @summary Get user profile
   * @request GET:/api/users/{username}
   */
  export namespace GetUserProfile {
    export type RequestParams = {
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserProfile;
  }

  /**
   * @description Return the currently authenticated user's summary.
   * @tags Users
   * @name GetCurrentUser
   * @summary Get current user
   * @request GET:/api/users/me
   * @secure
   */
  export namespace GetCurrentUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserSummary;
  }

  /**
   * @description Check whether a username is available.
   * @tags Users
   * @name CheckUsernameAvailability
   * @summary Check username availability
   * @request GET:/api/users/checkUsernameAvailability
   */
  export namespace CheckUsernameAvailability {
    export type RequestParams = {};
    export type RequestQuery = {
      username: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserIdentityAvailability;
  }

  /**
   * @description Check whether an email is available.
   * @tags Users
   * @name CheckEmailAvailability
   * @summary Check email availability
   * @request GET:/api/users/checkEmailAvailability
   */
  export namespace CheckEmailAvailability {
    export type RequestParams = {};
    export type RequestQuery = {
      email: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserIdentityAvailability;
  }

  /**
   * @description Return reviews written by the current user.
   * @tags Reviews
   * @name GetMyReviews
   * @summary List my reviews
   * @request GET:/api/reviews/me
   * @secure
   */
  export namespace GetMyReviews {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Receptionist returns active hotel assignments for the current account.
   * @tags Receptionist
   * @name GetMyHotels
   * @summary Get my assigned hotels
   * @request GET:/api/receptionist/me/hotels
   * @secure
   */
  export namespace GetMyHotels {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ReceptionistHotelResponse;
  }

  /**
   * @description Admin can list any hotel's bookings. Receptionist can list only assigned hotels. Use `status=CONFIRMED` for check-in/no-show queue and `status=CHECKED_IN` for check-out queue.
   * @tags Receptionist
   * @name GetHotelBookings
   * @summary List hotel bookings for front desk
   * @request GET:/api/receptionist/hotels/{hotelId}/bookings
   * @secure
   */
  export namespace GetHotelBookings {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
    };
    export type RequestQuery = {
      status?:
        | "PENDING"
        | "CONFIRMED"
        | "CHECKED_IN"
        | "CHECKED_OUT"
        | "CANCELLED"
        | "REFUNDED"
        | "NO_SHOW"
        | "EXPIRED";
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PagedResponse;
  }

  /**
   * @description Return a payment that belongs to the current authenticated user's booking.
   * @tags Payments
   * @name GetPayment
   * @summary Get payment by id
   * @request GET:/api/payments/{paymentId}
   * @secure
   */
  export namespace GetPayment {
    export type RequestParams = {
      /** @format uuid */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaymentResponse;
  }

  /**
   * @description Return invoice generated for a payment.
   * @tags Invoices
   * @name GetInvoiceByPayment
   * @summary Get invoice by payment
   * @request GET:/api/payments/{paymentId}/invoice
   * @secure
   */
  export namespace GetInvoiceByPayment {
    export type RequestParams = {
      /** @format uuid */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = InvoiceResponse;
  }

  /**
   * @description Return invoice details for owner or admin.
   * @tags Invoices
   * @name GetInvoice
   * @summary Get invoice by id
   * @request GET:/api/invoices/{invoiceId}
   * @secure
   */
  export namespace GetInvoice {
    export type RequestParams = {
      /** @format uuid */
      invoiceId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = InvoiceResponse;
  }

  /**
   * @description Return public visible reviews for a hotel.
   * @tags Reviews
   * @name GetHotelReviews
   * @summary List hotel reviews
   * @request GET:/api/hotels/{hotelId}/reviews
   */
  export namespace GetHotelReviews {
    export type RequestParams = {
      /** @format uuid */
      hotelId: string;
    };
    export type RequestQuery = {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }

  /**
   * @description Return a booking that belongs to the current authenticated user.
   * @tags Bookings
   * @name GetBooking
   * @summary Get booking by id
   * @request GET:/api/bookings/{id}
   * @secure
   */
  export namespace GetBooking {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BookingResponse;
  }

  /**
   * @description Cancel a booking that belongs to the current authenticated user.
   * @tags Bookings
   * @name CancelBooking
   * @summary Cancel booking
   * @request DELETE:/api/bookings/{id}
   * @secure
   */
  export namespace CancelBooking {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CancelBookingRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }

  /**
   * @description Return paginated bookings of the current authenticated user.
   * @tags Bookings
   * @name GetMyBookings
   * @summary Get my bookings
   * @request GET:/api/bookings/me
   * @secure
   */
  export namespace GetMyBookings {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page index starting from 0
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * Page size
       * @format int32
       * @default 30
       */
      size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PagedResponse;
  }

  /**
   * @description Admin deactivates a receptionist hotel assignment.
   * @tags Receptionist
   * @name DeactivateAssignment
   * @summary Deactivate receptionist assignment
   * @request DELETE:/api/receptionist/assignments/{id}
   * @secure
   */
  export namespace DeactivateAssignment {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApiMessageResponse;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<
  D extends unknown,
  E extends unknown = unknown,
> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title BookingAPI
 * @version v1
 * @baseUrl http://localhost:8080
 * @contact BookingAPI Team
 *
 * REST API for booking hotels, rooms, bookings and authentication. Local/dev default manager accounts: admin@booking.local / admin123 and manager@booking.local / admin123. Local/dev default receptionist account: reception@booking.local / admin123. Use POST /api/auth/manager/signin for manager/admin JWTs and POST /api/auth/signin for receptionist JWTs.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Admin only.
     *
     * @tags Invoices
     * @name UpdateTaxConfig
     * @summary Update tax config
     * @request PUT:/api/tax-configs/{id}
     * @secure
     */
    updateTaxConfig: (
      id: string,
      data: TaxConfigRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        TaxConfigResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/tax-configs/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Owner or admin updates a review.
     *
     * @tags Reviews
     * @name UpdateReview
     * @summary Update review
     * @request PUT:/api/reviews/{reviewId}
     * @secure
     */
    updateReview: (
      reviewId: string,
      data: ReviewRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/reviews/${reviewId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Owner or admin hides a review from public hotel reviews.
     *
     * @tags Reviews
     * @name HideReview
     * @summary Hide review
     * @request DELETE:/api/reviews/{reviewId}
     * @secure
     */
    hideReview: (reviewId: string, params: RequestParams = {}) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/reviews/${reviewId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return a single hotel by its id.
     *
     * @tags Hotels
     * @name GetHotel
     * @summary Get hotel by id
     * @request GET:/api/hotels/{id}
     */
    getHotel: (id: string, params: RequestParams = {}) =>
      this.request<
        HotelResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update an existing hotel. Admin only.
     *
     * @tags Hotels
     * @name UpdateHotel
     * @summary Update hotel
     * @request PUT:/api/hotels/{id}
     * @secure
     */
    updateHotel: (id: string, data: HotelRequest, params: RequestParams = {}) =>
      this.request<
        HotelResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete a hotel. Admin only.
     *
     * @tags Hotels
     * @name DeleteHotel
     * @summary Delete hotel
     * @request DELETE:/api/hotels/{id}
     * @secure
     */
    deleteHotel: (id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return a single room by hotel and room id.
     *
     * @tags Rooms
     * @name GetRoom
     * @summary Get room by id
     * @request GET:/api/hotels/{hotelId}/rooms/{id}
     */
    getRoom: (hotelId: string, id: string, params: RequestParams = {}) =>
      this.request<
        RoomResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/rooms/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update a room. Admin only.
     *
     * @tags Rooms
     * @name UpdateRoom
     * @summary Update room
     * @request PUT:/api/hotels/{hotelId}/rooms/{id}
     * @secure
     */
    updateRoom: (
      hotelId: string,
      id: string,
      data: RoomRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        RoomResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/rooms/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete a room. Admin only.
     *
     * @tags Rooms
     * @name DeleteRoom
     * @summary Delete room
     * @request DELETE:/api/hotels/{hotelId}/rooms/{id}
     * @secure
     */
    deleteRoom: (hotelId: string, id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/rooms/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return a single room type by hotel and room type id.
     *
     * @tags Room Types
     * @name GetRoomType
     * @summary Get room type by id
     * @request GET:/api/hotels/{hotelId}/room-types/{roomTypeId}
     */
    getRoomType: (
      hotelId: string,
      roomTypeId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        RoomTypeResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update a room type. Admin only.
     *
     * @tags Room Types
     * @name UpdateRoomType
     * @summary Update room type
     * @request PUT:/api/hotels/{hotelId}/room-types/{roomTypeId}
     * @secure
     */
    updateRoomType: (
      hotelId: string,
      roomTypeId: string,
      data: RoomTypeRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        RoomTypeResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete a room type. Admin only.
     *
     * @tags Room Types
     * @name DeleteRoomType
     * @summary Delete room type
     * @request DELETE:/api/hotels/{hotelId}/room-types/{roomTypeId}
     * @secure
     */
    deleteRoomType: (
      hotelId: string,
      roomTypeId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return a single amenity by room type and amenity id.
     *
     * @tags Room Types
     * @name GetAmenity
     * @summary Get room type amenity
     * @request GET:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities/{amenityId}
     */
    getAmenity: (
      hotelId: string,
      roomTypeId: string,
      amenityId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        AmenityResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}/amenities/${amenityId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update an amenity for a room type. Admin only.
     *
     * @tags Room Types
     * @name UpdateAmenity
     * @summary Update room type amenity
     * @request PUT:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities/{amenityId}
     * @secure
     */
    updateAmenity: (
      hotelId: string,
      roomTypeId: string,
      amenityId: string,
      data: AmenityRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        AmenityResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}/amenities/${amenityId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete an amenity from a room type. Admin only.
     *
     * @tags Room Types
     * @name DeleteAmenity
     * @summary Delete room type amenity
     * @request DELETE:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities/{amenityId}
     * @secure
     */
    deleteAmenity: (
      hotelId: string,
      roomTypeId: string,
      amenityId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}/amenities/${amenityId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Update a promotion/discount code. Admin only.
     *
     * @tags Booking Config
     * @name UpdateDiscount
     * @summary Update discount
     * @request PUT:/api/booking-config/discounts/{id}
     * @secure
     */
    updateDiscount: (
      id: string,
      data: DiscountRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/discounts/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deactivate a promotion/discount code. Admin only.
     *
     * @tags Booking Config
     * @name DeactivateDiscount
     * @summary Deactivate discount
     * @request DELETE:/api/booking-config/discounts/{id}
     * @secure
     */
    deactivateDiscount: (id: string, params: RequestParams = {}) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/discounts/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Update a cancellation policy. Admin only.
     *
     * @tags Booking Config
     * @name UpdateCancellationPolicy
     * @summary Update cancellation policy
     * @request PUT:/api/booking-config/cancellation-policies/{id}
     * @secure
     */
    updateCancellationPolicy: (
      id: string,
      data: CancellationPolicyRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/cancellation-policies/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deactivate a cancellation policy. Admin only.
     *
     * @tags Booking Config
     * @name DeactivateCancellationPolicy
     * @summary Deactivate cancellation policy
     * @request DELETE:/api/booking-config/cancellation-policies/{id}
     * @secure
     */
    deactivateCancellationPolicy: (id: string, params: RequestParams = {}) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/cancellation-policies/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Admin only.
     *
     * @tags Invoices
     * @name GetTaxConfigs
     * @summary List tax configs
     * @request GET:/api/tax-configs
     * @secure
     */
    getTaxConfigs: (params: RequestParams = {}) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/tax-configs`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Admin only.
     *
     * @tags Invoices
     * @name CreateTaxConfig
     * @summary Create tax config
     * @request POST:/api/tax-configs
     * @secure
     */
    createTaxConfig: (data: TaxConfigRequest, params: RequestParams = {}) =>
      this.request<
        TaxConfigResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/tax-configs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Admin lists receptionist hotel assignments.
     *
     * @tags Receptionist
     * @name GetAssignments
     * @summary List receptionist assignments
     * @request GET:/api/receptionist/assignments
     * @secure
     */
    getAssignments: (
      query?: {
        /** @format uuid */
        userId?: string;
        /** @format uuid */
        hotelId?: string;
        active?: boolean;
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PagedResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/receptionist/assignments`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Admin assigns a user to a hotel and grants `ROLE_RECEPTIONIST` if the user does not already have it.
     *
     * @tags Receptionist
     * @name AssignReceptionist
     * @summary Assign receptionist to hotel
     * @request POST:/api/receptionist/assignments
     * @secure
     */
    assignReceptionist: (
      data: ReceptionistAssignmentRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ReceptionistAssignmentResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/receptionist/assignments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create a manual refund record for a paid payment. This does not call a payOS refund API.
     *
     * @tags Payments
     * @name CreateManualRefund
     * @summary Create manual refund
     * @request POST:/api/payments/{paymentId}/refunds
     * @secure
     */
    createManualRefund: (
      paymentId: string,
      data: RefundRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        RefundResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/payments/${paymentId}/refunds`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Verify and process payOS payment webhook. This endpoint is public but signature-verified.
     *
     * @tags payOS Webhooks
     * @name HandleWebhook
     * @summary Receive payOS webhook
     * @request POST:/api/payments/payos/webhook
     */
    handleWebhook: (data: Webhook, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/payments/payos/webhook`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return paginated list of hotels.
     *
     * @tags Hotels
     * @name GetAllHotels
     * @summary Get all hotels
     * @request GET:/api/hotels
     */
    getAllHotels: (
      query?: {
        /**
         * Page index starting from 0
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * Page size
         * @format int32
         * @default 30
         */
        size?: number;
        /** Hotel Name, Location or Landmark */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PagedResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Create a new hotel. Admin only.
     *
     * @tags Hotels
     * @name AddHotel
     * @summary Create hotel
     * @request POST:/api/hotels
     * @secure
     */
    addHotel: (data: HotelRequest, params: RequestParams = {}) =>
      this.request<
        HotelResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Upload a preview image to object storage and attach it to the hotel. Admin only.
     *
     * @tags Hotels
     * @name UploadPreviewImage
     * @summary Upload hotel preview image
     * @request POST:/api/hotels/{id}/preview-image
     * @secure
     */
    uploadPreviewImage: (
      id: string,
      data: {
        /** @format binary */
        file: File;
      },
      query?: {
        altText?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HotelResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${id}/preview-image`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Delete the preview image metadata and object storage file when available. Admin only.
     *
     * @tags Hotels
     * @name DeletePreviewImage
     * @summary Delete hotel preview image
     * @request DELETE:/api/hotels/{id}/preview-image
     * @secure
     */
    deletePreviewImage: (id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${id}/preview-image`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return all rooms for a hotel.
     *
     * @tags Rooms
     * @name GetRooms
     * @summary Get rooms by hotel
     * @request GET:/api/hotels/{hotelId}/rooms
     */
    getRooms: (hotelId: string, params: RequestParams = {}) =>
      this.request<
        RoomResponse[],
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/rooms`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Create a new room for a hotel. Admin only.
     *
     * @tags Rooms
     * @name AddRoom
     * @summary Create room
     * @request POST:/api/hotels/{hotelId}/rooms
     * @secure
     */
    addRoom: (hotelId: string, data: RoomRequest, params: RequestParams = {}) =>
      this.request<
        RoomResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/rooms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return all room types for a hotel.
     *
     * @tags Room Types
     * @name GetRoomTypes
     * @summary Get room types by hotel
     * @request GET:/api/hotels/{hotelId}/room-types
     */
    getRoomTypes: (hotelId: string, params: RequestParams = {}) =>
      this.request<
        RoomTypeResponse[],
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Create a new room type for a hotel. Admin only.
     *
     * @tags Room Types
     * @name AddRoomType
     * @summary Create room type
     * @request POST:/api/hotels/{hotelId}/room-types
     * @secure
     */
    addRoomType: (
      hotelId: string,
      data: RoomTypeRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        RoomTypeResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return all amenities for a room type.
     *
     * @tags Room Types
     * @name GetAmenities
     * @summary Get room type amenities
     * @request GET:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities
     */
    getAmenities: (
      hotelId: string,
      roomTypeId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        AmenityResponse[],
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}/amenities`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Create a new amenity for a room type. Admin only. Amenity code is generated by the backend from the name.
     *
     * @tags Room Types
     * @name AddAmenity
     * @summary Create room type amenity
     * @request POST:/api/hotels/{hotelId}/room-types/{roomTypeId}/amenities
     * @secure
     */
    addAmenity: (
      hotelId: string,
      roomTypeId: string,
      data: AmenityRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        AmenityResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/room-types/${roomTypeId}/amenities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Upload a file to object storage and return its metadata.
     *
     * @tags Files
     * @name Upload
     * @summary Upload file
     * @request POST:/api/files/upload
     * @secure
     */
    upload: (
      data: {
        /** @format binary */
        file: File;
      },
      query?: {
        /** @default "hotel-images" */
        folder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UploadFileResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/files/upload`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Create a new booking for the current authenticated user. Requires `Idempotency-Key` header. Retrying with the same key and identical payload returns the existing booking instead of creating a duplicate.
     *
     * @tags Bookings
     * @name CreateBooking
     * @summary Create booking
     * @request POST:/api/bookings
     * @secure
     */
    createBooking: (data: BookingRequest, params: RequestParams = {}) =>
      this.request<
        BookingResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | BookingResponse
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create one review for a checked-out booking owned by the current user.
     *
     * @tags Reviews
     * @name CreateBookingReview
     * @summary Review booking
     * @request POST:/api/bookings/{bookingId}/review
     * @secure
     */
    createBookingReview: (
      bookingId: string,
      data: ReviewRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ReviewResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${bookingId}/review`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create or reuse an active payOS payment link for a pending booking owned by the current user.
     *
     * @tags Payments
     * @name CreatePayosPayment
     * @summary Create payOS payment link
     * @request POST:/api/bookings/{bookingId}/payments/payos
     * @secure
     */
    createPayosPayment: (bookingId: string, params: RequestParams = {}) =>
      this.request<
        PaymentResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | PaymentResponse
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${bookingId}/payments/payos`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description List promotion/discount codes. Admin only.
     *
     * @tags Booking Config
     * @name GetDiscounts
     * @summary List discounts
     * @request GET:/api/booking-config/discounts
     * @secure
     */
    getDiscounts: (
      query?: {
        active?: boolean;
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/discounts`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Create a promotion/discount code. Admin only.
     *
     * @tags Booking Config
     * @name CreateDiscount
     * @summary Create discount
     * @request POST:/api/booking-config/discounts
     * @secure
     */
    createDiscount: (data: DiscountRequest, params: RequestParams = {}) =>
      this.request<
        DiscountResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/discounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description List cancellation policies. Admin only.
     *
     * @tags Booking Config
     * @name GetCancellationPolicies
     * @summary List cancellation policies
     * @request GET:/api/booking-config/cancellation-policies
     * @secure
     */
    getCancellationPolicies: (
      query?: {
        /** @format uuid */
        hotelId?: string;
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/cancellation-policies`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Create a cancellation policy. Admin only.
     *
     * @tags Booking Config
     * @name CreateCancellationPolicy
     * @summary Create cancellation policy
     * @request POST:/api/booking-config/cancellation-policies
     * @secure
     */
    createCancellationPolicy: (
      data: CancellationPolicyRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CancellationPolicyResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/booking-config/cancellation-policies`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create a new user account with default role assignment.
     *
     * @tags Auth
     * @name RegisterUser
     * @summary Sign up user
     * @request POST:/api/auth/signup
     */
    registerUser: (data: SignUpRequest, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Authenticate an existing user and return a JWT access token. Local/dev default receptionist: email reception@booking.local, password admin123.
     *
     * @tags Auth
     * @name AuthenticateUser
     * @summary Sign in as user
     * @request POST:/api/auth/signin
     */
    authenticateUser: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<
        JwtAuthResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Generate an OTP token for resetting a password.
     *
     * @tags Auth
     * @name RequestPasswordReset
     * @summary Request password reset OTP
     * @request POST:/api/auth/otp/password-reset/request
     */
    requestPasswordReset: (data: OtpRequest, params: RequestParams = {}) =>
      this.request<
        OtpTokenResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/otp/password-reset/request`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Confirm the OTP token and update the account password.
     *
     * @tags Auth
     * @name ResetPassword
     * @summary Confirm password reset OTP
     * @request POST:/api/auth/otp/password-reset/confirm
     */
    resetPassword: (
      data: PasswordResetConfirmRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/otp/password-reset/confirm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Generate an OTP token for verifying a newly registered email.
     *
     * @tags Auth
     * @name RequestEmailVerification
     * @summary Request email verification OTP
     * @request POST:/api/auth/otp/email-verification/request
     */
    requestEmailVerification: (data: OtpRequest, params: RequestParams = {}) =>
      this.request<
        OtpTokenResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/otp/email-verification/request`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Confirm the OTP token and mark the email as verified.
     *
     * @tags Auth
     * @name VerifyEmail
     * @summary Confirm email verification OTP
     * @request POST:/api/auth/otp/email-verification/confirm
     */
    verifyEmail: (data: OtpVerifyRequest, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/otp/email-verification/confirm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Authenticate a manager account and return a JWT access token. Local/dev default managers: admin@booking.local / admin123 and manager@booking.local / admin123.
     *
     * @tags Auth
     * @name AuthenticateManager
     * @summary Sign in as manager
     * @request POST:/api/auth/manager/signin
     */
    authenticateManager: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<
        JwtAuthResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/auth/manager/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Move a booking through the allowed status state machine. Admin only.
     *
     * @tags Bookings
     * @name UpdateBookingStatus
     * @summary Update booking status
     * @request PATCH:/api/bookings/{id}/status
     * @secure
     */
    updateBookingStatus: (
      id: string,
      data: BookingStatusUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        BookingResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 403
             */
            status?: number;
            /** @example "Forbidden" */
            error?: string;
            /** @example "Access denied" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${id}/status`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Mark a confirmed booking as no-show. Admin or receptionist only. Local/dev receptionist account: reception@booking.local / admin123.
     *
     * @tags Bookings
     * @name MarkNoShow
     * @summary Mark booking as no-show
     * @request PATCH:/api/bookings/{id}/no-show
     * @secure
     */
    markNoShow: (id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${id}/no-show`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Check-out a checked-in booking. Admin or receptionist only. Local/dev receptionist account: reception@booking.local / admin123.
     *
     * @tags Bookings
     * @name CheckOutBooking
     * @summary Check-out booking
     * @request PATCH:/api/bookings/{id}/check-out
     * @secure
     */
    checkOutBooking: (id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${id}/check-out`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Check-in a confirmed booking. Admin or receptionist only. Local/dev receptionist account: reception@booking.local / admin123.
     *
     * @tags Bookings
     * @name CheckInBooking
     * @summary Check-in booking
     * @request PATCH:/api/bookings/{id}/check-in
     * @secure
     */
    checkInBooking: (id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${id}/check-in`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Return a public profile for a given username.
     *
     * @tags Users
     * @name GetUserProfile
     * @summary Get user profile
     * @request GET:/api/users/{username}
     */
    getUserProfile: (username: string, params: RequestParams = {}) =>
      this.request<
        UserProfile,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/users/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Return the currently authenticated user's summary.
     *
     * @tags Users
     * @name GetCurrentUser
     * @summary Get current user
     * @request GET:/api/users/me
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<
        UserSummary,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/users/me`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Check whether a username is available.
     *
     * @tags Users
     * @name CheckUsernameAvailability
     * @summary Check username availability
     * @request GET:/api/users/checkUsernameAvailability
     */
    checkUsernameAvailability: (
      query: {
        username: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UserIdentityAvailability,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/users/checkUsernameAvailability`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Check whether an email is available.
     *
     * @tags Users
     * @name CheckEmailAvailability
     * @summary Check email availability
     * @request GET:/api/users/checkEmailAvailability
     */
    checkEmailAvailability: (
      query: {
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UserIdentityAvailability,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/users/checkEmailAvailability`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Return reviews written by the current user.
     *
     * @tags Reviews
     * @name GetMyReviews
     * @summary List my reviews
     * @request GET:/api/reviews/me
     * @secure
     */
    getMyReviews: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/reviews/me`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Receptionist returns active hotel assignments for the current account.
     *
     * @tags Receptionist
     * @name GetMyHotels
     * @summary Get my assigned hotels
     * @request GET:/api/receptionist/me/hotels
     * @secure
     */
    getMyHotels: (params: RequestParams = {}) =>
      this.request<
        ReceptionistHotelResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/receptionist/me/hotels`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Admin can list any hotel's bookings. Receptionist can list only assigned hotels. Use `status=CONFIRMED` for check-in/no-show queue and `status=CHECKED_IN` for check-out queue.
     *
     * @tags Receptionist
     * @name GetHotelBookings
     * @summary List hotel bookings for front desk
     * @request GET:/api/receptionist/hotels/{hotelId}/bookings
     * @secure
     */
    getHotelBookings: (
      hotelId: string,
      query?: {
        status?:
          | "PENDING"
          | "CONFIRMED"
          | "CHECKED_IN"
          | "CHECKED_OUT"
          | "CANCELLED"
          | "REFUNDED"
          | "NO_SHOW"
          | "EXPIRED";
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PagedResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/receptionist/hotels/${hotelId}/bookings`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Return a payment that belongs to the current authenticated user's booking.
     *
     * @tags Payments
     * @name GetPayment
     * @summary Get payment by id
     * @request GET:/api/payments/{paymentId}
     * @secure
     */
    getPayment: (paymentId: string, params: RequestParams = {}) =>
      this.request<
        PaymentResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/payments/${paymentId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Return invoice generated for a payment.
     *
     * @tags Invoices
     * @name GetInvoiceByPayment
     * @summary Get invoice by payment
     * @request GET:/api/payments/{paymentId}/invoice
     * @secure
     */
    getInvoiceByPayment: (paymentId: string, params: RequestParams = {}) =>
      this.request<
        InvoiceResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/payments/${paymentId}/invoice`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Return invoice details for owner or admin.
     *
     * @tags Invoices
     * @name GetInvoice
     * @summary Get invoice by id
     * @request GET:/api/invoices/{invoiceId}
     * @secure
     */
    getInvoice: (invoiceId: string, params: RequestParams = {}) =>
      this.request<
        InvoiceResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/invoices/${invoiceId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Return public visible reviews for a hotel.
     *
     * @tags Reviews
     * @name GetHotelReviews
     * @summary List hotel reviews
     * @request GET:/api/hotels/{hotelId}/reviews
     */
    getHotelReviews: (
      hotelId: string,
      query?: {
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/hotels/${hotelId}/reviews`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Return a booking that belongs to the current authenticated user.
     *
     * @tags Bookings
     * @name GetBooking
     * @summary Get booking by id
     * @request GET:/api/bookings/{id}
     * @secure
     */
    getBooking: (id: string, params: RequestParams = {}) =>
      this.request<
        BookingResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Cancel a booking that belongs to the current authenticated user.
     *
     * @tags Bookings
     * @name CancelBooking
     * @summary Cancel booking
     * @request DELETE:/api/bookings/{id}
     * @secure
     */
    cancelBooking: (
      id: string,
      data: CancelBookingRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/${id}`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return paginated bookings of the current authenticated user.
     *
     * @tags Bookings
     * @name GetMyBookings
     * @summary Get my bookings
     * @request GET:/api/bookings/me
     * @secure
     */
    getMyBookings: (
      query?: {
        /**
         * Page index starting from 0
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * Page size
         * @format int32
         * @default 30
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PagedResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/bookings/me`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Admin deactivates a receptionist hotel assignment.
     *
     * @tags Receptionist
     * @name DeactivateAssignment
     * @summary Deactivate receptionist assignment
     * @request DELETE:/api/receptionist/assignments/{id}
     * @secure
     */
    deactivateAssignment: (id: string, params: RequestParams = {}) =>
      this.request<
        ApiMessageResponse,
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 400
             */
            status?: number;
            /** @example "Bad Request" */
            error?: string;
            /** @example "Request validation failed" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 401
             */
            status?: number;
            /** @example "Unauthorized" */
            error?: string;
            /** @example "Unauthorized" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 404
             */
            status?: number;
            /** @example "Not Found" */
            error?: string;
            /** @example "Resource not found" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
        | {
            /** @example false */
            success?: boolean;
            /**
             * @format int32
             * @example 500
             */
            status?: number;
            /** @example "Internal Server Error" */
            error?: string;
            /** @example "Unexpected server error" */
            message?: string;
            /** @example "/api/resource" */
            path?: string;
            validationErrors?: object;
          }
      >({
        path: `/api/receptionist/assignments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
