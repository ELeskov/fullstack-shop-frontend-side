import clsx from 'clsx'
import { ExternalLink, Heart, Minus, Plus, Trash2 } from 'lucide-react'
import type { SchemaBasketItemDto } from '@/shared/api/api-endpoints'
import NumberFlow from '@number-flow/react'
import { Checkbox } from '@/shared/ui/components/ui/checkbox'

import s from './BasketProductCard.module.scss'
import {
  useAddProductToBasket,
  useChangeProductSelect,
  useDecrementProductFromBasket,
} from '@/shared/api/basket'
import { useDeleteProductFromBasket } from '@/shared/api/basket'

type BasketProductCardProps = SchemaBasketItemDto

export function BasketProductCard({
  product,
  quantity,
  isSelected,
}: BasketProductCardProps) {
  const { images, color, price, title, id: productId } = product

  const { mutateAsync: addToBasket, isPending: isAddingToBasket } =
    useAddProductToBasket()
  const { mutateAsync: removeFromBasket, isPending: isRemovingFromBasket } =
    useDecrementProductFromBasket()
  const { mutateAsync: clearFromBasket, isPending: isClearingFromBasket } =
    useDeleteProductFromBasket()
  const { mutateAsync: changeSelectStatus, isPending: isChangingSelectStatus } =
    useChangeProductSelect()

  const handleAddToBasket = () => addToBasket(productId)
  const handleRemoveFromBasket = () => removeFromBasket(productId)
  const handleClearFromBasket = () => clearFromBasket(productId)
  const handleChangeSelectStatus = () =>
    changeSelectStatus({ productId, newStatus: !isSelected })

  return (
    <div className={s['basket-item']}>
      <div className={s['basket-item__left']}>
        <div className={s['basket-item__checkbox-wrapper']}>
          <Checkbox
            checked={isSelected}
            className={s['basket-item__checkbox']}
            onCheckedChange={() => handleChangeSelectStatus()}
            disabled={isChangingSelectStatus}
          />
        </div>
        <div className={s['basket-item__image-wrapper']}>
          <img
            src={images[0]}
            alt={title}
            className={s['basket-item__image']}
          />
        </div>
      </div>

      <div className={s['basket-item__middle']}>
        <div className={s['basket-item__info']}>
          <h3 className={s['basket-item__title']}>{title}</h3>
          {color && (
            <div className={s['basket-item__props']}>
              <span>{color.title}</span>
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
            onClick={() => handleClearFromBasket()}
            aria-label="Удалить"
            disabled={isClearingFromBasket}
          >
            <Trash2 size={20} />
          </button>
          <button
            className={s['basket-item__action-btn']}
            aria-label="Поделиться"
          >
            <ExternalLink size={20} className="hover:text-blue-400" />
          </button>
        </div>
      </div>

      <div className={s['basket-item__right']}>
        <div className={s['basket-item__quantity']}>
          <button
            type="button"
            className={s['basket-item__qty-btn']}
            onClick={() => handleRemoveFromBasket()}
            disabled={quantity <= 1 || isRemovingFromBasket}
          >
            <Minus size={14} />
          </button>
          <span className={s['basket-item__qty-value']}>
            <NumberFlow value={quantity} />
          </span>
          <button
            type="button"
            className={s['basket-item__qty-btn']}
            onClick={() => handleAddToBasket()}
            disabled={isAddingToBasket}
          >
            <Plus size={14} />
          </button>
        </div>

        <div className={s['basket-item__price-group']}>
          <span className={s['basket-item__price']}>
            <NumberFlow
              value={price * quantity}
              format={{ currency: 'RUB', style: 'currency' }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
