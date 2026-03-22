import { BasketProductCard } from '@/entities/basketProductCard'
import { Checkbox } from '@/shared/ui/components/ui/checkbox'
import { Badge } from '@/shared/ui/components/ui/badge'
import { useChangeAllProductSelect, useGetBasket } from '@/shared/api/basket'

import s from './BasketProductsList.module.scss'
import { calculateBasketStats } from '@/shared/helpers'

export function BasketProductsList() {
  const { data: basket, isLoading } = useGetBasket()
  const { mutateAsync: changeAllSelectStatus } = useChangeAllProductSelect()

  const { selectedQuantity, totalQuantity, allSelected } =
    calculateBasketStats(basket)

  if (isLoading) {
    return 'Загрузка...'
  }

  if (!basket) {
    return 'В корзине ничего нет'
  }

  const { basketItems } = basket

  return (
    <div className={s['basket-list-container']}>
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
    </div>
  )
}
