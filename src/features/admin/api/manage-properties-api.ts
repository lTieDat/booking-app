import { getJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import { requireSession } from '../../../shared/routes/guards';
import type { Hotel, HotelStatistics, ManagerProfile } from '../../../shared/types/domain';

export async function loadManagePropertiesPage() {
  const session = requireSession('manager');
  const manager = session.profile as ManagerProfile;

  const responses = await Promise.all((manager.hotel_id ?? []).map((hotelId) => getJson(`/hotel/${hotelId}`)));

  return {
    hotels: responses.map((response) => unwrapData<Hotel>(response)),
  };
}

export async function loadPropertyDetailPage(hotelId: string) {
  requireSession('manager');

  const [hotelResponse, statisticsResponse] = await Promise.all([
    getJson(`/hotel/${hotelId}`),
    getJson(`/hotel/${hotelId}/statistics`),
  ]);

  return {
    hotel: unwrapData<Hotel>(hotelResponse),
    statistics: unwrapData<HotelStatistics>(statisticsResponse),
  };
}
