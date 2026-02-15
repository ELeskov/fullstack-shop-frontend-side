import { useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/config/query-key'
import { saveSelectedShopId } from '@/shared/helpers'

export const useSelectedShopId = () => {
  const qc = useQueryClient()

  const { data: selectedShopId } = useQuery({
    queryKey: [QUERY_KEY.ME_SELECTED_SHOP_ID],
    queryFn: async () =>
      qc.getQueryData([QUERY_KEY.ME_SELECTED_SHOP_ID]) ?? null,
    staleTime: Infinity,
  })

  const setSelectedShopId = (id: string) => {
    qc.setQueryData([QUERY_KEY.ME_SELECTED_SHOP_ID], id)
    saveSelectedShopId(id)
  }

  return { selectedShopId, setSelectedShopId }
}
