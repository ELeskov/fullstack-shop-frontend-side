import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { LoaderCircle, Wallet } from 'lucide-react'
import { toast } from 'sonner'

import { AddToCartButton } from '@/features/addToCartButton'

import { useCreateReviewMutation, useGetProductReviews } from '@/shared/api'
import type { SchemaOrderResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/components/ui/dialog'
import { Rating, RatingButton } from '@/shared/ui/components/ui/rating'
import { Textarea } from '@/shared/ui/components/ui/textarea'

import s from './purchaseCard.module.scss'

type PurchaseOrder = SchemaOrderResponseDto
type PurchaseOrderItem = SchemaOrderResponseDto['products'][number]

interface PurchaseCardProps {
  order: PurchaseOrder
  item: PurchaseOrderItem
  className?: string
}

export function PurchaseCard({ order, item, className }: PurchaseCardProps) {
  const product = item.product
  const image = product?.images?.[0] ?? ''
  const price = (product?.price ?? 0).toLocaleString('ru-RU')
  const productTitle = product?.title ?? 'Товар удален'
  const description = product?.description ?? 'Описание недоступно'
  const canOpenProduct = Boolean(product?.id)

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const { data: productReviews } = useGetProductReviews(product?.id)

  const savedReview = useMemo(() => {
    if (!productReviews || !product?.id) {
      return null
    }

    return (
      productReviews.find(review => review.productId === product.id) ?? null
    )
  }, [productReviews, product?.id])

  const { mutateAsync: createReview, isPending: isSendingReview } =
    useCreateReviewMutation()

  const canLeaveReview = Boolean(
    order.orderStatus === 'PAYED' &&
      product?.id &&
      product?.shopId &&
      !savedReview,
  )

  const currentRating = savedReview?.rating ?? 0

  const handleReviewDialogOpenChange = (open: boolean) => {
    if (open && !canLeaveReview) {
      return
    }

    setIsReviewDialogOpen(open)
  }

  const handleCardRatingChange = (value: number) => {
    if (!canLeaveReview) {
      if (savedReview) {
        toast.info('Отзыв уже оставлен')
      } else {
        toast.info('Оставить отзыв пока нельзя')
      }
      return
    }

    setReviewRating(value)
    setIsReviewDialogOpen(true)
  }

  const handleSendReview = async () => {
    if (!product?.id || !product.shopId) {
      toast.error('Невозможно отправить отзыв: отсутствует товар или магазин')
      return
    }

    const text = reviewText.trim()

    if (!reviewRating) {
      toast.error('Выберите рейтинг')
      return
    }

    try {
      await createReview({
        rating: reviewRating,
        text: text || '',
        productId: product.id,
        shopId: product.shopId,
      })

      setReviewText('')
      setReviewRating(0)
      setIsReviewDialogOpen(false)
      toast.success('Отзыв отправлен')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось отправить отзыв',
      )
    }
  }

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={clsx(s['purchase-card'], className)}
      >
        <div className={s['purchase-card__wrapper']}>
          {canOpenProduct ? (
            <Link
              to={ROUTES.product.id(product!.id)}
              className={s['purchase-card__image-link']}
            >
              {image ? (
                <img
                  src={image}
                  loading="lazy"
                  alt={productTitle}
                  className={s['purchase-card__img']}
                />
              ) : (
                <div className={s['purchase-card__img-fallback']}>Нет фото</div>
              )}
            </Link>
          ) : image ? (
            <img
              src={image}
              loading="lazy"
              alt={productTitle}
              className={s['purchase-card__img']}
            />
          ) : (
            <div className={s['purchase-card__img-fallback']}>
              Товар недоступен
            </div>
          )}

          <div className={s['purchase-card__content']}>
            <h3 className={s['purchase-card__title']}>{productTitle}</h3>
            <p className={s['purchase-card__description']}>{description}</p>

            <div className={s['purchase-card__meta']}>
              <span className={s['purchase-card__price']}>
                <Wallet size={16} />
                {price} ₽
              </span>
              <span className={s['purchase-card__qty']}>
                Кол-во: {item.quantity}
              </span>
            </div>

            <div className={s['purchase-card__rating-row']}>
              <div className={s['purchase-card__review-block']}>
                <Rating
                  value={currentRating}
                  onValueChange={handleCardRatingChange}
                  readOnly={!canLeaveReview}
                  className={clsx(
                    s['purchase-card__rating'],
                    !canLeaveReview && s['purchase-card__rating--locked'],
                  )}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} />
                  ))}
                </Rating>

                <span className={s['purchase-card__review-caption']}>
                  {savedReview
                    ? 'Отзыв уже оставлен'
                    : 'Нажмите на звезды, чтобы оставить отзыв'}
                </span>
              </div>

              <span className={s['purchase-card__order-info']}>
                Заказ #{order.id.slice(0, 8)}
              </span>
            </div>

            {product?.id ? (
              <div className={s['purchase-card__actions']}>
                <AddToCartButton productId={product.id} />
              </div>
            ) : null}
          </div>
        </div>
      </motion.article>

      <Dialog
        open={isReviewDialogOpen}
        onOpenChange={handleReviewDialogOpenChange}
      >
        <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className={s['purchase-card__dialog-title']}>
              <div className={s['purchase-card__dialog-product']}>
                {image ? (
                  <img
                    src={image}
                    alt={productTitle}
                    className={s['purchase-card__dialog-product-image']}
                  />
                ) : (
                  <div className={s['purchase-card__dialog-product-fallback']}>
                    Нет фото
                  </div>
                )}
                <span className={s['purchase-card__dialog-product-title']}>
                  {productTitle}
                </span>
              </div>

              <Rating
                value={reviewRating}
                onValueChange={setReviewRating}
                className={s['purchase-card__dialog-rating']}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} />
                ))}
              </Rating>
            </DialogTitle>

            <DialogDescription className="text-zinc-400">
              Оцените товар и напишите короткий отзыв
            </DialogDescription>
          </DialogHeader>

          <div className={s['purchase-card__dialog-content']}>
            <Textarea
              value={reviewText}
              onChange={event => setReviewText(event.target.value)}
              className="min-h-28 border-white/10 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-500"
              placeholder="Напишите ваш отзыв о товаре..."
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border-white/10 bg-white/[0.03] text-zinc-100 hover:bg-white/10"
              onClick={() => setIsReviewDialogOpen(false)}
              disabled={isSendingReview}
            >
              Отмена
            </Button>

            <Button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-500"
              onClick={handleSendReview}
              disabled={isSendingReview || !reviewRating}
            >
              {isSendingReview ? (
                <LoaderCircle className="animate-spin" />
              ) : null}
              Отправить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
