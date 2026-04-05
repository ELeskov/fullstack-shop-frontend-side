import { motion } from 'motion/react'

import { BasketProductCard } from '@/entities/basketProductCard'

import { useChangeAllProductSelect, useGetBasket } from '@/shared/api/basket'
import { ROUTES } from '@/shared/config'
import { calculateBasketStats } from '@/shared/helpers'
import { Badge } from '@/shared/ui/components/ui/badge'
import { Checkbox } from '@/shared/ui/components/ui/checkbox'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './BasketProductsList.module.scss'

export function BasketProductsList() {
  const { data: basket, isLoading } = useGetBasket()
  const { mutateAsync: changeAllSelectStatus } = useChangeAllProductSelect()

  const { selectedQuantity, totalQuantity, allSelected } =
    calculateBasketStats(basket)

  if (isLoading) {
    return <LoadingData />
  }

  if (!basket || !basket.basketItems.length) {
    return (
      <EmptyData
        title="Корзина пустая"
        description="Скорее добавляйте товары в корзину и переходите к их оформлению"
        linkText="К покупкам"
        linkTo={ROUTES.catalog}
      />
    )
  }

  const { basketItems } = basket

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
      className={s['basket-list-container']}
    >
      <div className={s['basket-list-container__header']}>
        <label
          onClick={() => changeAllSelectStatus()}
          className={s['basket-list-container__select-all']}
        >
          <Checkbox checked={allSelected} />
          <span className="select-none">Выбрать все</span>
        </label>

        <div className={s['basket-list-container__title-group']}>
          <Badge variant={'outline'}>
            Товаров:{' '}
            <span className={s['basket-list-container__number']}>
              {totalQuantity}
            </span>
          </Badge>

          <Badge variant={'outline'}>
            Выбрано:{' '}
            <span className={s['basket-list-container__number']}>
              {selectedQuantity}
            </span>
          </Badge>
        </div>
      </div>

      <div className={s['basket-list-container__items']}>
        {basketItems.map(product => (
          <BasketProductCard key={product.id} {...product} />
        ))}
      </div>
    </motion.div>
  )
}
