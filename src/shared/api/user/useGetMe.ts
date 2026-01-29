import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetMe = () =>
  useQuery({
    queryKey: [QUERY_KEY.ME],

    queryFn: async () => {
      const { data, response } = await apiClient.GET('/api/users/me')

      if (!response.ok) {
        return null
      }

      return data
    },
    retry: false,
  })
