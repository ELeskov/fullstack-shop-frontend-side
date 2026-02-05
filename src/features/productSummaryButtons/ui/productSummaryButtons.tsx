import { Button } from '@/shared/ui/components/ui/button'

import s from './productSummaryButtons.module.scss'

export function ProductSummaryButtons() {
  return (
    <div className={s['product-summary__buttons']}>
      <Button className={s['product-summary__buttons-button']}>
        Добавить в корзину
      </Button>
      <Button
        variant={'outline'}
        className={s['product-summary__buttons-button']}
      >
        Купить сейчас
      </Button>
    </div>
  )
}
