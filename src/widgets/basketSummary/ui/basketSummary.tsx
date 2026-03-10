import { CheckCircle2, Pencil } from 'lucide-react'

import { CustomButton } from '@/shared/ui/customButton'

import s from './BasketSummary.module.scss'

export function BasketSummary() {
  const totalItems = 2
  const totalPrice = 4344 // Уже со скидкой, как на скрине

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <aside className={s['basket-summary']}>
      {/* Доставка */}
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

      {/* Оплата */}
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
          Товары, {totalItems} шт.
        </div>

        <div className={s['basket-summary__total-row']}>
          <span className={s['basket-summary__total-label']}>Итого</span>
          <span className={s['basket-summary__total-value']}>
            {formatPrice(totalPrice)}
          </span>
        </div>

        <CustomButton className={s['basket-summary__submit-btn']}>
          Заказать
        </CustomButton>

        <div className={s['basket-summary__agreement']}>
          <CheckCircle2 size={14} className="text-purple-500 shrink-0 mt-0.5" />
          <span>
            Соглашаюсь с правилами пользования торговой площадкой и возврата
          </span>
        </div>
      </div>
    </aside>
  )
}
