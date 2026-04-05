import clsx from 'clsx'

import { AddToCartButton } from '@/features/addToCartButton'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'

import s from './productMobileSummary.module.scss'

type ProductMobileSummaryProps = {
  product: SchemaProductResponseDto
}

export const ProductMobileSummary = ({
  product,
}: ProductMobileSummaryProps) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(
    product.price ?? 0,
  )

  return (
    <div className={clsx(s['product-mobile-summary'], 'visible-laptop')}>
      <div className={s['product-mobile-summary__price']}>
        <span className={s['product-mobile-summary__price-current']}>
          {formattedPrice} ₽
        </span>
      </div>

      <AddToCartButton productId={product.id} />
    </div>
  )
}
