import clsx from 'clsx'
import { Heart, Minus, Plus, Share2, Trash2 } from 'lucide-react'

import { Checkbox } from '@/shared/ui/components/ui/checkbox'

import s from './BasketProductCard.module.scss'

interface BasketProductCardProps {
  id: string
  title: string
  price: number
  image: string
  properties?: string
  quantity: number
}

export function BasketProductCard({
  id,
  title,
  price,
  image,
  properties,
  quantity,
}: BasketProductCardProps) {
  const formatPrice = (val: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div className={s['basket-item']}>
      <div className={s['basket-item__left']}>
        <div className={s['basket-item__checkbox-wrapper']}>
          <Checkbox
            checked={true}
            className={s['basket-item__checkbox']}
            // onCheckedChange={checked => onToggleSelect(id, !!checked)}
          />
        </div>
        <div className={s['basket-item__image-wrapper']}>
          <img src={image} alt={title} className={s['basket-item__image']} />
        </div>
      </div>

      <div className={s['basket-item__middle']}>
        <div className={s['basket-item__info']}>
          <h3 className={s['basket-item__title']}>{title}</h3>
          {properties && (
            <span className={s['basket-item__props']}>{properties}</span>
          )}
        </div>

        <div className={s['basket-item__actions']}>
          <button
            className={s['basket-item__action-btn']}
            aria-label="В избранное"
          >
            <Heart size={20} />
          </button>
          <button
            className={clsx(
              s['basket-item__action-btn'],
              s['basket-item__action-btn--delete'],
            )}
            // onClick={() => onRemove(id)}
            aria-label="Удалить"
          >
            <Trash2 size={20} />
          </button>
          <button
            className={s['basket-item__action-btn']}
            aria-label="Поделиться"
          >
            <Share2 size={20} className="hover:text-blue-500" />
          </button>
        </div>
      </div>

      <div className={s['basket-item__right']}>
        <div className={s['basket-item__quantity']}>
          <button
            type="button"
            className={s['basket-item__qty-btn']}
            // onClick={() => onDecrease(id)}
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className={s['basket-item__qty-value']}>{quantity}</span>
          <button
            type="button"
            className={s['basket-item__qty-btn']}
            // onClick={() => onIncrease(id)}
          >
            <Plus size={14} />
          </button>
        </div>

        <div className={s['basket-item__price-group']}>
          <span className={s['basket-item__price']}>{formatPrice(price)}</span>
        </div>
      </div>
    </div>
  )
}
