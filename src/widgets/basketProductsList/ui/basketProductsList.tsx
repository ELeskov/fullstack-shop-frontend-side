import { useState } from 'react'

import { BasketProductCard } from '@/entities/basketProductCard'

import { Checkbox } from '@/shared/ui/components/ui/checkbox'

import s from './BasketProductsList.module.scss'

const DUMMY_PRODUCTS = [
  {
    id: '1',
    title: 'Стеллаж -система хранения Бали',
    price: 3298,
    oldPrice: 10307,
    image: 'https://via.placeholder.com/80x104',
    properties: 'белый • 38 см',
    deliveryDate: 'Послезавтра',
    quantity: 1,
  },
  {
    id: '2',
    title: 'Стакан подставка держатель для зубных щеток',
    price: 1046,
    oldPrice: 2468,
    image: 'https://via.placeholder.com/80x104',
    properties: 'белый, молочный',
    deliveryDate: 'Послезавтра',
    quantity: 2,
  },
]

export function BasketProductsList() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2'])

  const isAllSelected = selectedIds.length === DUMMY_PRODUCTS.length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(DUMMY_PRODUCTS.map((p) => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleToggleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id))
    }
  }

  return (
    <div className={s['basket-list-container']}>
      <div className={s['basket-list-container__header']}>
        <div className={s['basket-list-container__title-group']}>
          <h2 className={s['basket-list-container__title']}>Магазин</h2>
          <span className={s['basket-list-container__count']}>
            {DUMMY_PRODUCTS.length} товаров
          </span>
        </div>

        <label className={s['basket-list-container__select-all']}>
          <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
          <span>Выбрать все</span>
        </label>
      </div>

      <div className={s['basket-list-container__items']}>
        {DUMMY_PRODUCTS.map((product) => (
          <BasketProductCard
            key={product.id}
            {...product}
            isSelected={selectedIds.includes(product.id)}
            onToggleSelect={handleToggleSelect}
            onIncrease={() => {}}
            onDecrease={() => {}}
            onRemove={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
