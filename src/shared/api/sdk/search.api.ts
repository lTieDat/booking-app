import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import type { ApiResponse } from '../contracts';
import { HttpClient } from '../http';
import { unwrapData } from '../unwrap';
import type { BookingSearch, Hotel } from '../../types/domain';

export class SearchApi {
  private readonly BASE_PATH = '/hotel/search';

  constructor(private readonly client: HttpClient) {}

  results(search: BookingSearch) {
    return queryOptions({
      queryKey: ['search', 'results', search],
      queryFn: async ({ signal }) => {
        if (!search.city && !search.country) {
          return [] as Hotel[];
        }

        const response = await this.client.get<ApiResponse<Hotel[]>>(this.BASE_PATH, {
          query: { ...search },
          signal,
        });

        return unwrapData<Hotel[]>(response) ?? [];
      },
      placeholderData: keepPreviousData,
    });
  }
}
