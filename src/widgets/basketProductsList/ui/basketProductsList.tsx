import clsx from 'clsx'

import { ProductCard } from '@/entities/productCard'

import s from './basketProductsList.module.scss'

export function BasketProductsList() {
  return (
    <section className={clsx(s['basket-products-list'], 'product-card-list')}>
      <ProductCard />
      <ProductCard />
    </section>
  )
}
