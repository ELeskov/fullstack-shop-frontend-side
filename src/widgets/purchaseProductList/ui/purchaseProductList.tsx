import clsx from 'clsx'
import { motion } from 'framer-motion'

import { PurchaseCard } from '@/entities/purchaseCard'

import s from './purchaseProductList.module.scss'

export function PurchaseProductList() {
  // Статические данные для демонстрации (заменится на реальные при подключении API)
  const products = [
    {
      id: 1,
      images: ['/path/to/image1.jpg'],
      price: 255,
      category: { title: 'Аксессуары' },
      title: 'Крючок под стол для сумок',
      rating: 3,
      deliveryDate: '11 марта',
    },
    {
      id: 2,
      images: ['/path/to/image2.jpg'],
      price: 499,
      category: { title: 'Офисная мебель' },
      title: 'Подставка для ноутбука',
      rating: 4.5,
      deliveryDate: '5 марта',
    },
    {
      id: 3,
      images: ['/path/to/image3.jpg'],
      price: 1299,
      category: { title: 'Освещение' },
      title: 'Настольная лампа LED',
      rating: 5,
      deliveryDate: '20 февраля',
    },
  ]

  return (
    <div className={clsx(s['purchase-product-list'], 'product-card-list')}>
      <motion.ul
        className={s['purchase-product-list__grid']}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {products.map(product => (
          <li key={product.id} className={s['purchase-product-list__item']}>
            <PurchaseCard product={product} />
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
