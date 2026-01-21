import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetMe = () =>
  useQuery({
    queryKey: QUERY_KEY.me,

    queryFn: async () => {
      const { data, error, response } = await apiClient.GET('/api/users/me')
      console.log(response)

      if (error) {
        console.log(error.message)
      }

      if (!response.ok) {
        return null
      }

      return data
    },
    retry: false,
  })
