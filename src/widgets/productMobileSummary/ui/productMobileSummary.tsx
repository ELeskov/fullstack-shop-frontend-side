import clsx from 'clsx'

import { Button } from '@/shared/ui/components/ui/button'

import s from './productMobileSummary.module.scss'

export const ProductMobileSummary = () => {
  return (
    <div className={clsx(s['product-mobile-summary'], 'visible-tablet')}>
      <div className={s['product-mobile-summary__price']}>
        <span className={s['product-mobile-summary__price-current']}>
          3 920 ₽
        </span>
        <span className={s['product-mobile-summary__price-old']}>4 512 ₽</span>
      </div>

      <div className={s['product-mobile-summary__buttons']}>
        <Button>В корзину</Button>
        <Button variant={'outline'}>Купить сейчас</Button>
      </div>
    </div>
  )
}
