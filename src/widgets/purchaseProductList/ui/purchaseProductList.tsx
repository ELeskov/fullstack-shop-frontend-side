import { motion } from 'framer-motion'

import { PurchaseCard } from '@/entities/purchaseCard'

import type { PurchaseOrder } from '@/shared/types/order.interface'

import s from './purchaseProductList.module.scss'

const mockOrders: PurchaseOrder[] = [
  {
    id: '8c4d2a57-96fc-4a71-9d63-1bfc8b9cc8aa',
    status: 'COMPLETED',
    total: 3498,
    userId: 'user-1',
    createdAt: '2026-03-22T10:20:00.000Z',
    updatedAt: '2026-03-22T10:20:00.000Z',
    items: [
      {
        id: 'item-1',
        quantity: 2,
        price: 1299,
        orderId: '8c4d2a57-96fc-4a71-9d63-1bfc8b9cc8aa',
        productId: 'product-1',
        shopId: 'shop-1',
        createdAt: '2026-03-22T10:20:00.000Z',
        updatedAt: '2026-03-22T10:20:00.000Z',
        product: {
          id: 'product-1',
          title: 'Настольная лампа LED',
          description:
            'Компактная лампа для рабочего стола с регулировкой яркости.',
          price: 1299,
          images: [
            'https://spb-basket-cdn-02bl.geobasket.ru/vol1416/part141621/141621327/images/big/1.webp',
          ],
          shopId: 'shop-1',
          categoryId: 'category-1',
          colorId: null,
          createdAt: '2026-03-10T08:00:00.000Z',
          updatedAt: '2026-03-10T08:00:00.000Z',
        },
      },
      {
        id: 'item-2',
        quantity: 1,
        price: 900,
        orderId: '8c4d2a57-96fc-4a71-9d63-1bfc8b9cc8aa',
        productId: 'product-2',
        shopId: 'shop-2',
        review: {
          id: 'review-1',
          rating: 3,
          text: 'Удобный крючок, но хотелось бы чуть толще металл.',
          createdAt: '2026-03-24T12:10:00.000Z',
          updatedAt: '2026-03-24T12:10:00.000Z',
        },
        createdAt: '2026-03-22T10:20:00.000Z',
        updatedAt: '2026-03-22T10:20:00.000Z',
        product: {
          id: 'product-2',
          title: 'Крючок под стол для сумок',
          description:
            'Минималистичный металлический крючок для организации рабочего места.',
          price: 900,
          images: [
            'https://spb-basket-cdn-01bl.geobasket.ru/vol8172/part817290/817290767/images/big/1.webp',
          ],
          shopId: 'shop-2',
          categoryId: 'category-2',
          colorId: null,
          createdAt: '2026-03-11T08:00:00.000Z',
          updatedAt: '2026-03-11T08:00:00.000Z',
        },
      },
    ],
  },
]

export function PurchaseProductList() {
  const purchaseItems = mockOrders.flatMap(order =>
    order.items.map(item => ({
      order,
      item,
      key: `${order.id}-${item.id}`,
    })),
  )

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
