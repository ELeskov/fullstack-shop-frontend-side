import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export type StatisticsPeriod = '7d' | '30d' | '90d'

export const useGetProfileStatistics = (period: StatisticsPeriod = '90d') => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_STATISTICS, period],
    queryFn: async ({ signal }) => {
      const { data, error } = await apiClient.GET('/api/statistics/profile', {
        params: {
          query: {
            period,
          },
        },
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения статистики')
      }

      return data
    },
  })
}
