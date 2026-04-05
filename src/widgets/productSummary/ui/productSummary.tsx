import { Link } from 'react-router'

import { Star, Store } from 'lucide-react'

import { AddToCartButton } from '@/features/addToCartButton'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'

import s from './productSummary.module.scss'

type ProductReview = {
  rating?: number | null
}

type ProductWithSummaryData = SchemaProductResponseDto & {
  reviews?: ProductReview[] | null
  shop?: {
    title?: string | null
  } | null
}

type ProductSummaryProps = {
  product: SchemaProductResponseDto
}

export function ProductSummary({ product }: ProductSummaryProps) {
  const productData = product as ProductWithSummaryData
  const reviews = productData.reviews ?? []
  const hasReviews = reviews.length > 0
  const averageRating = hasReviews
    ? (
        reviews.reduce((sum, review) => sum + Number(review.rating ?? 0), 0) /
        reviews.length
      )
        .toFixed(1)
        .replace('.', ',')
    : '0,0'

  const formattedPrice = new Intl.NumberFormat('ru-RU').format(
    product.price ?? 0,
  )
  const shopTitle = productData.shop?.title?.trim() || 'Магазин'

  return (
    <div className={s['product-summary']}>
      <div className={s['product-summary__wrapper']}>
        <div className={s['product-summary__price']}>
          <h2 className={s['product-summary__price-current']}>
            {formattedPrice} ₽
          </h2>
        </div>

        <AddToCartButton productId={product.id} />

        <div className={s['product-summary__info']}>
          <div className={s['product-summary__info-row']}>
            <Store
              size={16}
              className={s['product-summary__info-row--rating']}
            />
            <span className="flex items-center gap-2">
              <Link to={`${ROUTES.profile.shops.root}${product.shop?.id}`}>
                {shopTitle}
              </Link>
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              {averageRating}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
