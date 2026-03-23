import { AnimatePresence } from 'motion/react'

import { ShopCard } from '@/entities/shopCard'

import { useGetMeShops } from '@/shared/api/shop/useGetMeShops'

import s from './shopCardList.module.scss'
import { EmptyData } from '@/shared/ui/emptyData'
import { ROUTES } from '@/shared/config'
import { LoadingData } from '@/shared/ui/loadingData'

export function ShopCardList() {
  const { data: shops, isLoading } = useGetMeShops()

  if (isLoading) {
    return <LoadingData />
  }

  if (!shops || !shops.length) {
    return (
      <EmptyData
        title="Магазины не найдены"
        description="Создайте магазин и сделайте первый шаг к продажам"
        linkText="Создать магазин"
        linkTo={ROUTES.profile.shops.create}
      />
    )
  }

  return (
    <div className={s['shop-card-list']}>
      <AnimatePresence mode="popLayout" initial={false}>
        {shops?.map(data => (
          <ShopCard key={data.id} data={data} />
        ))}
      </AnimatePresence>
    </div>
  )
}
