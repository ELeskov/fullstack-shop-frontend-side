import { Link } from 'react-router'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'

import { AddToCartButton } from '@/features/addToCartButton'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import { Rating } from '@/shared/ui/components/ui/rating'

import s from './purchaseCard.module.scss'

interface ProductCardProps {
  product: SchemaProductResponseDto
  className?: string
}

export function PurchaseCard({ product, className }: ProductCardProps) {
  const mainImage = product?.images ?? ''
  const formattedPrice = product?.price.toLocaleString('ru-RU')
  const brand = product?.category?.title ?? 'Без категории'
  // const deliveryDate = product?.deliveryDate ?? 'Дата не указана'

  if (!product) {
    return <span>Загрузка...</span>
  }

  return (
    <motion.article
      key={product.id}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        layout: { duration: 0.4 },
      }}
      className={clsx(s['purchase-card'], className)}
    >
      <Link to={ROUTES.product.id(product.id)}>
        <div className={s['purchase-card__wrapper']}>
          <div className={s['purchase-card__top']}>
            <img
              src={mainImage}
              loading="lazy"
              alt={product?.title}
              className={s['purchase-card__img']}
            />
            {/* Используем Rating из Kibo UI вместо кастомных звёзд */}
            <Rating value={3} className={s['purchase-card__rating']} />
          </div>

          <div className={s['purchase-card__middle']}>
            <div className={s['purchase-card__price']}>
              <span className={s['purchase-card__price-wrap']}>
                <Wallet size={16} />
                <ins>{formattedPrice} ₽</ins>
              </span>
            </div>

            <h2 className={s['purchase-card__brand-wrap']}>
              <span className={s['purchase-card__brand']}>{brand}</span>
              <span className={s['purchase-card__name']}>
                &nbsp;/&nbsp;{product?.title}
              </span>
            </h2>

            <div className={s['purchase-card__delivery-info']}>
              <span className={s['purchase-card__delivery-label']}>
                Получен:
              </span>
              {/* <span className={s['purchase-card__delivery-date']}>
                {deliveryDate}
              </span> */}
            </div>
          </div>

          <div className={s['purchase-card__bottom']}>
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
