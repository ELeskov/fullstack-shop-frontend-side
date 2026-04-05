import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'

import s from './productReviews.module.scss'

type ProductReview = {
  id: string
  text?: string | null
  rating?: number | null
  createdAt?: string | null
  user?: {
    name?: string | null
    picture?: string | null
  } | null
}

type ProductWithReviews = SchemaProductResponseDto & {
  reviews?: ProductReview[] | null
}

type ProductReviewsProps = {
  product: SchemaProductResponseDto
}

const formatReviewDate = (createdAt?: string | null) => {
  if (!createdAt) {
    return 'Без даты'
  }

  const parsedDate = new Date(createdAt)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Без даты'
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate)
}

export const ProductReviews = ({ product }: ProductReviewsProps) => {
  const reviews = (product as ProductWithReviews).reviews ?? []

  return (
    <section className={s['product-reviews']}>
      <h4 className={s['product-reviews__title']}>Отзывы</h4>

      {reviews.length > 0 ? (
        <ul className={s['product-reviews__list']}>
          {reviews.map(review => {
            const authorName = review.user?.name?.trim() || 'Пользователь'
            const reviewText =
              review.text?.trim() || 'Пользователь оставил только оценку'
            const reviewDate = formatReviewDate(review.createdAt)
            const ratingValue = Math.max(
              0,
              Math.min(5, Number(review.rating ?? 0)),
            )
              .toFixed(1)
              .replace('.', ',')

            return (
              <li key={review.id} className={s['product-reviews__card']}>
                <Avatar className={s['product-reviews__avatar']}>
                  <AvatarImage src={review.user?.picture ?? ''} />
                  <AvatarFallback className={s['product-reviews__avatar-fallback']}>
                    {authorName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className={s['product-reviews__content']}>
                  <div className={s['product-reviews__head']}>
                    <div className={s['product-reviews__meta']}>
                      <span className={s['product-reviews__author']}>
                        {authorName}
                      </span>
                      <span className={s['product-reviews__date']}>{reviewDate}</span>
                    </div>
                    <span className={s['product-reviews__rating']}>{ratingValue}</span>
                  </div>

                  <p className={s['product-reviews__message']}>{reviewText}</p>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className={s['product-reviews__empty']}>
          У этого товара пока нет отзывов.
        </p>
      )}
    </section>
  )
}
