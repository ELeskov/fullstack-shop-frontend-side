import clsx from 'clsx'
import { Heart, Minus, Plus, Share, Trash2 } from 'lucide-react'

import { Checkbox } from '@/shared/ui/components/ui/checkbox'

import s from './BasketProductCard.module.scss'

interface BasketProductCardProps {
  id: string
  title: string
  price: number
  oldPrice?: number
  image: string
  properties?: string
  deliveryDate?: string
  quantity: number
  isSelected: boolean
  onToggleSelect: (id: string, checked: boolean) => void
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export function BasketProductCard({
  id,
  title,
  price,
  oldPrice,
  image,
  properties,
  deliveryDate,
  quantity,
  isSelected,
  onToggleSelect,
  onIncrease,
  onDecrease,
  onRemove,
}: BasketProductCardProps) {
  const formatPrice = (val: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div className={s['basket-item']}>
      {/* Лево: Чекбокс и Картинка */}
      <div className={s['basket-item__left']}>
        <div className={s['basket-item__checkbox-wrapper']}>
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onToggleSelect(id, !!checked)}
          />
        </div>
        <div className={s['basket-item__image-wrapper']}>
          <img src={image} alt={title} className={s['basket-item__image']} />
        </div>
      </div>

      {/* Центр: Текст и Иконки */}
      <div className={s['basket-item__middle']}>
        <div className={s['basket-item__info']}>
          <h3 className={s['basket-item__title']}>{title}</h3>
          {properties && (
            <span className={s['basket-item__props']}>{properties}</span>
          )}

          {/* Доставка */}
          {deliveryDate && (
            <div className={s['basket-item__delivery']}>
              <span>{deliveryDate}</span>
              <span className={s['basket-item__delivery-badge']}>
                Бесплатный отказ
              </span>
            </div>
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
            onClick={() => onRemove(id)}
            aria-label="Удалить"
          >
            <Trash2 size={20} />
          </button>
          <button
            className={s['basket-item__action-btn']}
            aria-label="Поделиться"
          >
            <Share size={20} />
          </button>
        </div>
      </div>

      {/* Право: Степпер и Цены */}
      <div className={s['basket-item__right']}>
        <div className={s['basket-item__quantity']}>
          <button
            type="button"
            className={s['basket-item__qty-btn']}
            onClick={() => onDecrease(id)}
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className={s['basket-item__qty-value']}>{quantity}</span>
          <button
            type="button"
            className={s['basket-item__qty-btn']}
            onClick={() => onIncrease(id)}
          >
            <Plus size={14} />
          </button>
        </div>

        <div className={s['basket-item__price-group']}>
          <span className={s['basket-item__price']}>{formatPrice(price)}</span>
          {oldPrice && (
            <span className={s['basket-item__price-old']}>
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
