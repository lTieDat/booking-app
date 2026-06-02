import { AdminApi } from './sdk/admin.api';
import { AuthApi } from './sdk/auth.api';
import { BookingApi } from './sdk/booking.api';
import { HotelApi } from './sdk/hotel.api';
import { ProfileApi } from './sdk/profile.api';
import { SearchApi } from './sdk/search.api';
import { createSpringApiClient } from './spring-client';
import type { SpringApiClient } from './spring-client';

export class Api {
  auth: AuthApi;
  search: SearchApi;
  hotel: HotelApi;
  booking: BookingApi;
  profile: ProfileApi;
  admin: AdminApi;

  constructor(springClient: SpringApiClient) {
    this.auth = new AuthApi(springClient);
    this.search = new SearchApi(springClient);
    this.hotel = new HotelApi(springClient);
    this.booking = new BookingApi(springClient);
    this.profile = new ProfileApi(springClient);
    this.admin = new AdminApi(springClient);
  }
}

export const api = new Api(createSpringApiClient());
