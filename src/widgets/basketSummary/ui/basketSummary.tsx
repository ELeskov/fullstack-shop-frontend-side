import { CheckCircle2, Pencil } from 'lucide-react'

import { CustomButton } from '@/shared/ui/customButton'

import NumberFlow from '@number-flow/react'
import s from './BasketSummary.module.scss'
import { useGetBasket } from '@/shared/api/basket'
import { calculateBasketStats } from '@/shared/helpers'

export function BasketSummary() {
  const { data: basket, isLoading } = useGetBasket()
  const { totalQuantity, totalPrice } = calculateBasketStats(basket)

  if (isLoading) {
    return 'Загрузка'
  }

  if (!basket) {
    return 'Не удалось загрузить данные'
  }

  return (
    <aside className={s['basket-summary']}>
      <div className={s['basket-summary__block']}>
        <div className={s['basket-summary__block-header']}>
          <span className={s['basket-summary__block-title']}>
            Доставка в пункт выдачи
          </span>
          <Pencil size={16} className={s['basket-summary__edit-btn']} />
        </div>
        <p className={s['basket-summary__text']}>
          Санкт-Петербург, Проспект
          <br />
          Энергетиков 52б
        </p>
      </div>

      <div className={s['basket-summary__block']}>
        <div className={s['basket-summary__block-header']}>
          <span className={s['basket-summary__block-title']}>
            Способ оплаты
          </span>
          <Pencil size={16} className={s['basket-summary__edit-btn']} />
        </div>
        <p className={s['basket-summary__text']}>Картой онлайн</p>
      </div>

      <div className={s['basket-summary__block']}>
        <div className={s['basket-summary__total-header']}>
          Товары, {totalQuantity} шт.
        </div>

        <div className={s['basket-summary__total-row']}>
          <span className={s['basket-summary__total-label']}>Итого</span>
          <span className={s['basket-summary__total-value']}>
            <NumberFlow
              value={totalPrice}
              format={{ currency: 'RUB', style: 'currency' }}
            />
          </span>
        </div>

        <CustomButton
          variant={'default'}
          className={s['basket-summary__submit-btn']}
        >
          Заказать
        </CustomButton>

        <div className={s['basket-summary__agreement']}>
          <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
          <span>Соглашаюсь с правилами пользования торговой площадкой</span>
        </div>
      </div>
    </aside>
  )
}
