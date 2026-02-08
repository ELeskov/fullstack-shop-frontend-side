import { Link } from 'react-router'

import clsx from 'clsx'

import { HeartButton } from '@/features/heartButton'

import { AddBasketButton } from '@/shared/ui/addBasketButton'

import s from './productCard.module.scss'

export function ProductCard({ className }: { className?: string }) {
  return (
    <article className={clsx(s['product-card'], className)}>
      <HeartButton className="product-card__heard" />
      <Link to={''}>
        <div className={s['product-card__wrapper']}>
          <div className={s['product-card__top']}>
            <img
              src="https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg"
              loading="lazy"
              alt="Телефон"
              className={s['product-card__img']}
            />
          </div>
          <div className={s['product-card__middle']}>
            <div className={s['product-card__price']}>
              <span className={s['product-card__price-wrap']}>
                <ins>{(80000).toLocaleString()} ₽</ins>
                <del>{(100000).toLocaleString()} ₽</del>
              </span>
            </div>
            <h2 className={s['product-card__brand-wrap']}>
              <span className={s['product-card__brand']}>Samsung</span>
              <span className={s['product-card__name']}>
                &nbsp;/&nbsp;Samsumg S25 color gray
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
