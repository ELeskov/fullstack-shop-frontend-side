import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetMeShops = () =>
  useQuery({
    queryKey: [QUERY_KEY.ME_SHOP],
    queryFn: async ({ signal }) => {
      const { data, error } = await apiClient.GET('/api/shop/@me', { signal })

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })
