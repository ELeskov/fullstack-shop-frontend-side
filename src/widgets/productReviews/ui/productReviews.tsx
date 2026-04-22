import { useGetProductReviews } from '@/shared/api'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import { Rating, RatingButton } from '@/shared/ui/components/ui/rating'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './productReviews.module.scss'

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

export const ProductReviews = ({ productId }: { productId: string }) => {
  const { data: reviews, isLoading } = useGetProductReviews(productId)

  if (!reviews || isLoading) {
    return <LoadingData />
  }

  return (
    <section className={s['product-reviews']}>
      <h4 className={s['product-reviews__title']}>Отзывы</h4>

      {reviews?.length > 0 ? (
        <ul className={s['product-reviews__list']}>
          {reviews.map(review => {
            const authorName = review.author?.name?.trim() || 'Пользователь'
            const reviewText = review.text?.trim() || ''
            const reviewDate = formatReviewDate(review.createdAt)
            const ratingValue = review.rating

            return (
              <li key={review.id} className={s['product-reviews__card']}>
                <Avatar className={s['product-reviews__avatar']}>
                  <AvatarImage src={review.author?.picture ?? ''} />
                  <AvatarFallback
                    className={s['product-reviews__avatar-fallback']}
                  >
                    {authorName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className={s['product-reviews__content']}>
                  <div className={s['product-reviews__head']}>
                    <div className={s['product-reviews__meta']}>
                      <span className={s['product-reviews__author']}>
                        {authorName}
                      </span>
                      <span className={s['product-reviews__date']}>
                        {reviewDate}
                      </span>
                    </div>
                    <Rating
                      readOnly
                      value={+ratingValue}
                      className="text-yellow-300"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton key={index} />
                      ))}
                    </Rating>
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
