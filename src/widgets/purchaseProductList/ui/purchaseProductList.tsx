import { motion } from 'framer-motion'

import { PurchaseCard } from '@/entities/purchaseCard'

import { useGetOrders } from '@/shared/api/order'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './purchaseProductList.module.scss'

export function PurchaseProductList() {
  const { data, isLoading } = useGetOrders({
    status: 'PAYED',
    sortByCreatedAt: 'desc',
  })

  if (isLoading) {
    return <LoadingData />
  }

  const orders = data ?? []

  const purchaseItems = orders.flatMap(order =>
    order.products.map((item, index) => ({
      order,
      item,
      key: `${order.id}-${item.product?.id ?? 'product'}-${index}`,
    })),
  )

  if (!purchaseItems.length) {
    return (
      <EmptyData
        title="Покупок пока нет"
        description="После оплаты заказов они появятся на этой странице."
      />
    )
  }

  return (
    <section className={s['purchase-product-list']}>
      <motion.ul
        className={s['purchase-product-list__grid']}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {purchaseItems.map(({ key, order, item }) => (
          <li key={key} className={s['purchase-product-list__item']}>
            <PurchaseCard order={order} item={item} />
          </li>
        ))}
      </motion.ul>
    </section>
  )
}
