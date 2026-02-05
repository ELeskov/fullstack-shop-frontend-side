import { Link } from 'react-router'

import { Star, Store } from 'lucide-react'

import { ProductSummaryButtons } from '@/features/productSummaryButtons'

import s from './productSummary.module.scss'

export function ProductSummary() {
  return (
    <div className={s['product-summary']}>
      <div className={s['product-summary__price']}>
        <h2 className={s['product-summary__price-current']}>3 902 ₽</h2>
        <span className={s['product-summary__price-old']}>3 982 ₽</span>
      </div>

      <ProductSummaryButtons />

      <div className={s['product-summary__info']}>
        <div className={s['product-summary__info-row']}>
          <Store size={16} className={s['product-summary__info-row--rating']} />
          <span className="flex items-center gap-2">
            <Link to={''}>Opulent dreams</Link>{' '}
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            4,8
          </span>
        </div>
      </div>
    </div>
  )
}
