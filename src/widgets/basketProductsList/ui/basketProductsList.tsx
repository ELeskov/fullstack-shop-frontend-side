import { useState } from 'react'

import { BasketProductCard } from '@/entities/basketProductCard'

import { Checkbox } from '@/shared/ui/components/ui/checkbox'

import s from './BasketProductsList.module.scss'

const DUMMY_PRODUCTS = [
  {
    id: '2',
    title: 'Стакан подставка держатель для зубных щеток',
    price: 1046,
    oldPrice: 2468,
    image:
      'https://4f35f4d0-2fb4974b-6046-4608-bcaa-2df25d95c300.s3.timeweb.cloud/product/1772824137730-ia352jxnj9-1.webp',
    properties: 'белый, молочный',
    deliveryDate: 'Послезавтра',
    quantity: 2,
  },
  {
    id: '3',
    title: 'Стакан держатель для зубных щеток',
    price: 1046,
    oldPrice: 2468,
    image:
      'https://4f35f4d0-2fb4974b-6046-4608-bcaa-2df25d95c300.s3.timeweb.cloud/product/1772824137730-ia352jxnj9-1.webp',
    properties: 'белый, молочный',
    deliveryDate: 'Послезавтра',
    quantity: 2,
  },
  {
    id: '4',
    title: 'Стакан подставка для зубных щеток',
    price: 1046,
    oldPrice: 2468,
    image:
      'https://4f35f4d0-2fb4974b-6046-4608-bcaa-2df25d95c300.s3.timeweb.cloud/product/1772824137730-ia352jxnj9-1.webp',
    properties: 'белый, молочный',
    deliveryDate: 'Послезавтра',
    quantity: 2,
  },
]

export function BasketProductsList() {
  return (
    <div className={s['basket-list-container']}>
      <div className={s['basket-list-container__header']}>
        <label className={s['basket-list-container__select-all']}>
          <Checkbox checked={true} onCheckedChange={() => {}} />
          <span className="select-none">Выбрать все</span>
        </label>
        <div className={s['basket-list-container__title-group']}>
          <span className={s['basket-list-container__count-select']}>
            Выбрано: {DUMMY_PRODUCTS.length}
          </span>
          <span className={s['basket-list-container__count']}>
            Товаров: {}
          </span>
        </div>
      </div>

      <div className={s['basket-list-container__items']}>
        {DUMMY_PRODUCTS.map(product => (
          <BasketProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
