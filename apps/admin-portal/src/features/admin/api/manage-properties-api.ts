import { api } from '@booking/shared';

export function getManagePropertiesQuery() {
  return api.admin.manageProperties();
}

export function getPropertyDetailQuery(hotelId: string) {
  return api.admin.propertyDetail(hotelId);
}
