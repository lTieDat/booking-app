import { api } from '../../../shared/api';

export function getManageBookingsQuery() {
  return api.admin.manageBookings();
}
