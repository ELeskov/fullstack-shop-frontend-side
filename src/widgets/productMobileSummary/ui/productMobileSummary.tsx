import clsx from 'clsx'

import { ProductSummaryButtons } from '@/features/productSummaryButtons'

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

      <ProductSummaryButtons />
    </div>
  )
}
