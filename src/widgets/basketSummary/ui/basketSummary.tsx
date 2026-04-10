import { useNavigate } from 'react-router'

import NumberFlow from '@number-flow/react'
import { CheckCircle2, Pencil } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'

import { useGetBasket } from '@/shared/api/basket'
import { useCreateOrderFromBasketMutation } from '@/shared/api/order'
import { ROUTES } from '@/shared/config'
import { calculateBasketStats } from '@/shared/helpers'
import { CustomButton } from '@/shared/ui/customButton'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './BasketSummary.module.scss'

export function BasketSummary() {
  const navigate = useNavigate()
  const { data: basket, isLoading } = useGetBasket()
  const { mutateAsync: createOrderFromBasket, isPending: isCreatingOrder } =
    useCreateOrderFromBasketMutation()

  const { totalQuantity, totalPrice } = calculateBasketStats(basket)

  const handleCreateOrder = async () => {
    await createOrderFromBasket()
    toast.success('Заказ создан')
    navigate(ROUTES.profile.orders)
  }

  if (isLoading) {
    return <LoadingData />
  }

  if (!basket) {
    return <EmptyData title="Корзина пустая" />
  }

  return (
    <motion.aside
      className={s['basket-summary']}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
    >
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
          disabled={totalPrice === 0 || isCreatingOrder}
          isLoading={isCreatingOrder}
          onClick={handleCreateOrder}
        >
          Заказать
        </CustomButton>

        <div className={s['basket-summary__agreement']}>
          <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
          <span>Соглашаюсь с правилами пользования торговой площадкой</span>
        </div>
      </div>
    </motion.aside>
  )
}
