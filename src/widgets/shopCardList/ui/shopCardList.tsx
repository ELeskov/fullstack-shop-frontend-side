import { AnimatePresence } from 'motion/react'

import { ShopCard } from '@/entities/shopCard'

import { useGetMeShops } from '@/shared/api/shop/useGetMeShops'

import s from './shopCardList.module.scss'

export function ShopCardList() {
  const { data: shops } = useGetMeShops()

  return (
    <div className={s['shop-card-list']}>
      <AnimatePresence mode="popLayout" initial={false}>
        {shops?.map((data) => (
          <ShopCard key={data.id} data={data} />
        ))}
      </AnimatePresence>
    </div>
  )
}
