import { Link } from 'react-router'

import clsx from 'clsx'
import { Wallet } from 'lucide-react'

import { HeartButton } from '@/features/heartButton'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import { AddBasketButton } from '@/shared/ui/addBasketButton'

import s from './productCard.module.scss'

interface ProductCardProps {
  product: SchemaProductResponseDto
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const mainImage = product?.images[0] ?? ''
  const formattedPrice = product?.price.toLocaleString('ru-RU')
  const brand = product?.category?.title ?? 'Без категории'

  const productLink = `/product/${product?.id}`

  return (
    <article className={clsx(s['product-card'], className)}>
      <HeartButton className="product-card__heard" />
      <Link to={productLink}>
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
              <span className={s['product-card__brand']}>{brand}</span>
              <span className={s['product-card__name']}>
                &nbsp;/&nbsp;{product?.title}
              </span>
            </h2>
          </div>

          <div className={s['product-card__bottom']}>
            <AddBasketButton />
          </div>
        </div>
      </Link>
    </article>
  )
}
