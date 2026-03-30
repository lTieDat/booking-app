import { api } from '../../../shared/api';

export function getDashboardQuery() {
  return api.admin.dashboard();
}
