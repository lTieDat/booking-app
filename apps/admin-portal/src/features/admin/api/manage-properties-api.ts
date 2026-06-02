import { api } from '@booking/shared';

export function getManagePropertiesQuery() {
  return api.admin.manageProperties();
}

export function getPropertyDetailQuery(hotelId: string) {
  return api.admin.propertyDetail(hotelId);
}

export function getSaveHotelMutation() {
  return api.admin.saveHotel();
}

export function getDeleteHotelMutation() {
  return api.admin.deleteHotel();
}

export function getUploadPreviewImageMutation() {
  return api.admin.uploadPreviewImage();
}

export function getSaveRoomTypeMutation() {
  return api.admin.saveRoomType();
}

export function getSaveRoomMutation() {
  return api.admin.saveRoom();
}

export function getSaveAmenityMutation() {
  return api.admin.saveAmenity();
}

export function getBookingConfigQuery() {
  return api.admin.bookingConfig();
}

export function getSaveDiscountMutation() {
  return api.admin.saveDiscount();
}

export function getSaveCancellationPolicyMutation() {
  return api.admin.saveCancellationPolicy();
}

export function getSaveTaxConfigMutation() {
  return api.admin.saveTaxConfig();
}

export function getAssignReceptionistMutation() {
  return api.admin.assignReceptionist();
}

export function getHideReviewMutation() {
  return api.admin.hideReview();
}

export function getAdminReviewsQuery() {
  return api.admin.reviews();
}
