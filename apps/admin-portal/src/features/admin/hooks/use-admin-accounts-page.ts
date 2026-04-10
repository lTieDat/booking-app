import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from '@booking/shared';
import type { ManagerProfile } from '@booking/shared';
import { getDashboardQuery } from '../api/dashboard-api';
import { getManagePropertiesQuery } from '../api/manage-properties-api';

function formatSessionAge(createdAt?: string) {
  if (!createdAt) return 'Unknown';

  const diffInHours = Math.max(0, Math.round((Date.now() - new Date(createdAt).getTime()) / 3_600_000));

  if (diffInHours < 24) {
    return `${diffInHours}h active`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  return `${diffInDays}d active`;
}

export function useAdminAccountsPage() {
  const session = useSession();
  const { data: dashboardData } = useSuspenseQuery(getDashboardQuery());
  const { data: propertiesData } = useSuspenseQuery(getManagePropertiesQuery());

  const manager = (session?.profile ?? {}) as ManagerProfile;
  const hotels = propertiesData.hotels ?? [];
  const revenueByHotelId = useMemo(
    () => new Map((dashboardData.dashboard.totalRevenue ?? []).map((item) => [item.hotelId, item.totalRevenue] as const)),
    [dashboardData.dashboard.totalRevenue]
  );

  const summary = useMemo(() => {
    const totalRooms = hotels.reduce((sum, hotel) => sum + (hotel.NumberOfRooms ?? 0), 0);
    const averageRating =
      hotels.length > 0
        ? hotels.reduce((sum, hotel) => sum + (hotel.Rating ?? 0), 0) / hotels.length
        : 0;

    return {
      managerName: manager.fullName ?? 'Manager account',
      role: session?.role ?? 'manager',
      propertyCount: hotels.length,
      totalRooms,
      averageRating,
      sessionAge: formatSessionAge(session?.createdAt),
      scopedHotels: manager.hotel_id ?? [],
    };
  }, [hotels, manager.fullName, manager.hotel_id, session?.createdAt, session?.role]);

  const managedProperties = useMemo(
    () =>
      hotels.map((hotel) => ({
        id: hotel.HotelId ?? hotel.id ?? '',
        name: hotel.HotelName ?? 'Unnamed property',
        city: hotel.Address?.City ?? 'Unknown city',
        country: hotel.Address?.Country ?? 'Unknown country',
        rating: hotel.Rating ?? 0,
        roomCount: hotel.NumberOfRooms ?? 0,
        revenue: revenueByHotelId.get(hotel.HotelId ?? hotel.id ?? '') ?? 0,
      })),
    [hotels, revenueByHotelId]
  );

  return {
    summary,
    managedProperties,
  };
}
