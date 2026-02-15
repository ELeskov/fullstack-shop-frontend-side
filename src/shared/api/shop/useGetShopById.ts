import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaShopResponseDto } from '../api-endpoints'

export const useGetShopById = (shopId?: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_SHOP_BY_ID, shopId],
    queryFn: async ({ signal }): Promise<SchemaShopResponseDto> => {
      if (!shopId) {
        throw new Error('Id не найден')
      }

      const { data } = await apiClient.GET('/api/shop/{id}', {
        params: { path: { id: shopId } },
        signal,
      })

      if (!data) {
        throw new Error('Данных о магазинах нет')
      }

      return data
    },
  })
