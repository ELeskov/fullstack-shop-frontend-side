import { useQuery, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import {
  clearSelectedShopId,
  loadSelectedShopId,
  saveSelectedShopId,
} from '@/shared/helpers'

export const useGetMeShops = () => {
  const qc = useQueryClient()

  return useQuery({
    queryKey: [QUERY_KEY.ME_SHOPS],
    queryFn: async ({ signal }) => {
      const { data: shops, error } = await apiClient.GET('/api/shop/@me', {
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки магазинов')
      }

      if (!shops.length) {
        qc.setQueryData([QUERY_KEY.ME_SELECTED_SHOP_ID], null)
        clearSelectedShopId()
        return
      }

      const saved = loadSelectedShopId()
      const selectedId =
        saved && shops.some((s) => s.id === saved) ? saved : shops[0].id

      qc.setQueryData([QUERY_KEY.ME_SELECTED_SHOP_ID], selectedId)
      saveSelectedShopId(selectedId)

      return shops
    },
  })
}
