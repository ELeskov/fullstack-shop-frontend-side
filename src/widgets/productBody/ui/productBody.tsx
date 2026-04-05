import { Link } from 'react-router'

import { Star } from 'lucide-react'

import { ProductMoreInfoSheet } from '@/widgets/productMoreInfoSheet'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import { Badge } from '@/shared/ui/components/ui/badge'
import { ProductTableOption } from '@/shared/ui/productTableOption'

import s from './productBody.module.scss'

type ProductReview = {
  rating?: number | null
}

type ProductWithReviews = SchemaProductResponseDto & {
  reviews?: ProductReview[] | null
}

type ProductBodyProps = {
  product: SchemaProductResponseDto
}

export const ProductBody = ({ product }: ProductBodyProps) => {
  const groupedOptions = Array.isArray(product.groupedOptions)
    ? product.groupedOptions
    : []
  const mainOptionsGroup = groupedOptions?.[0]?.options ?? []
  const previewOptions = mainOptionsGroup.slice(0, 5)

  const reviews = (product as ProductWithReviews).reviews ?? []
  const hasReviews = reviews.length > 0
  const averageRating = hasReviews
    ? (
        reviews.reduce((sum, review) => sum + Number(review.rating ?? 0), 0) /
        reviews.length
      )
        .toFixed(1)
        .replace('.', ',')
    : null

  return (
    <div className={s['product-body']}>
      <div className={s['product-body__header']}>
        <div className={s['product-body__badges']}>
          <Link to={`${ROUTES.profile.shops.root}${product.shop?.id}`}>
            <Badge variant={'secondary'} className={s['product-body__badge']}>
              {product.shop?.title}
            </Badge>
          </Link>
        </div>

        <h3 className={s['product-body__title']}>{product.title || 'Товар'}</h3>

        {product.description ? (
          <p className={s['product-body__description']}>
            {product.description}
          </p>
        ) : null}

        <div className={s['product-body__common-info']}>
          <div className={s['product-body__review']}>
            <Star size={13} className="text-yellow-500 fill-yellow-500" />
            <Link to={''} className={s['product-body__review-link']}>
              <span className={s['product-body__review-text']}>
                {hasReviews
                  ? `${averageRating} · ${reviews.length} ${reviews.length === 1 ? 'оценка' : 'оценок'}`
                  : 'Пока нет отзывов'}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={s['product-body__option']}>
        {previewOptions.length > 0 ? (
          <ProductTableOption mainOptionsGroup={previewOptions} />
        ) : (
          <p className={s['product-body__empty-option']}>
            Характеристики пока не заполнены.
          </p>
        )}

        <ProductMoreInfoSheet
          optionsGroup={groupedOptions}
          productId={product.id}
        />
      </div>
    </div>
  )
}
