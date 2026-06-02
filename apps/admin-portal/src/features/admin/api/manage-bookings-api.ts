import { api } from '@booking/shared';

export function getManageBookingsQuery() {
  return api.admin.manageBookings();
}

export function getFrontDeskQuery() {
  return api.admin.frontDesk();
}

export function getUpdateBookingStatusMutation() {
  return api.admin.updateBookingStatus();
}

export function getCheckInBookingMutation() {
  return api.admin.checkIn();
}

export function getCheckOutBookingMutation() {
  return api.admin.checkOut();
}

export function getNoShowBookingMutation() {
  return api.admin.noShow();
}

export function getManualRefundMutation() {
  return api.admin.refund();
}
