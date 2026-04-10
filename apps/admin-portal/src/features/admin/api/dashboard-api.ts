import { api } from '@booking/shared';

export function getDashboardQuery() {
  return api.admin.dashboard();
}
