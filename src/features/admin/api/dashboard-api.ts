import { getJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import { requireSession } from '../../../shared/routes/guards';
import type { DashboardData, Hotel, ManagerProfile } from '../../../shared/types/domain';

export async function loadDashboardPage() {
  const session = requireSession('manager');
  const manager = session.profile as ManagerProfile;

  const [dashboardResponse, hotelResponses] = await Promise.all([
    getJson(`/admin/dashboard/${session.token}`),
    Promise.all((manager.hotel_id ?? []).map((hotelId) => getJson(`/hotel/${hotelId}`))),
  ]);

  return {
    dashboard: unwrapData<DashboardData>(dashboardResponse),
    hotels: hotelResponses.map((hotelResponse) => unwrapData<Hotel>(hotelResponse)),
  };
}
