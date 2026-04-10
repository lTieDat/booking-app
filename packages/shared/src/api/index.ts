import { HttpClient } from './http';
import { AdminApi } from './sdk/admin.api';
import { AuthApi } from './sdk/auth.api';
import { BookingApi } from './sdk/booking.api';
import { HotelApi } from './sdk/hotel.api';
import { ProfileApi } from './sdk/profile.api';
import { SearchApi } from './sdk/search.api';

export class Api {
  auth: AuthApi;
  search: SearchApi;
  hotel: HotelApi;
  booking: BookingApi;
  profile: ProfileApi;
  admin: AdminApi;

  constructor(client: HttpClient) {
    this.auth = new AuthApi(client);
    this.search = new SearchApi(client);
    this.hotel = new HotelApi(client);
    this.booking = new BookingApi(client);
    this.profile = new ProfileApi(client);
    this.admin = new AdminApi(client);
  }
}

export const api = new Api(new HttpClient());
