import { Link } from 'react-router'

import clsx from 'clsx'
import { Wallet } from 'lucide-react'
import { motion } from 'motion/react'

import { AddToCartButton } from '@/features/addToCartButton'
import { HeartButton } from '@/features/heartButton'

import type { SchemaCatalogProductDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import { Badge } from '@/shared/ui/components/ui/badge'

import s from './productCard.module.scss'

interface ProductCardProps {
  product: SchemaCatalogProductDto
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const mainImage = product?.images[0] ?? ''
  const formattedPrice = product?.price.toLocaleString('ru-RU')
  const brand = product?.shop?.title ?? 'Без категории'
  const { isFavorite } = product

  if (!product) {
    return <span>Загрузка</span>
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
      className={clsx(s['product-card'], className)}
    >
      <HeartButton isFavorite={isFavorite} productId={product.id} />
      <Link to={ROUTES.product.id(product.id)}>
        <div className={s['product-card__wrapper']}>
          <div className={s['product-card__top']}>
            <img
              src={mainImage}
              loading="lazy"
              alt={product?.title}
              className={s['product-card__img']}
            />
          </div>

          <div className={s['product-card__middle']}>
            <div className={s['product-card__price']}>
              <span className={s['product-card__price-wrap']}>
                <Wallet size={16} />
                <ins>{formattedPrice} ₽</ins>
              </span>
            </div>

            <h2 className={s['product-card__brand-wrap']}>
              <Badge variant={'outline'}>{brand}</Badge>
              <span className={s['product-card__name']}>
                &nbsp;/&nbsp;{product?.title}
              </span>
            </h2>
          </div>

          <div className={s['product-card__bottom']}>
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
