import { api } from '@booking/shared';

export function getManageBookingsQuery() {
  return api.admin.manageBookings();
}
