import { api } from '../../../shared/api';

export function getManagePropertiesQuery() {
  return api.admin.manageProperties();
}

export function getPropertyDetailQuery(hotelId: string) {
  return api.admin.propertyDetail(hotelId);
}
