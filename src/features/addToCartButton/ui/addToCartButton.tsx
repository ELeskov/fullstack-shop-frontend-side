import { useState } from 'react'

import { CustomButton } from '@/shared/ui/customButton'

import s from './addToCartButton.module.scss'
import {
  useAddProductToBasket,
  useDecrementProductFromBasket,
} from '@/shared/api/basket'
import { useGetQuantityByProductId } from '@/shared/api/basket/useGetQuantityByProductId'

export function AddToCartButton({ productId }: { productId: string }) {
  const { data: product } = useGetQuantityByProductId(productId)

  const { mutateAsync: incrementQuantity, isPending: incrementPending } =
    useAddProductToBasket()
  const { mutateAsync: decrementQuantity, isPending: decrementPending } =
    useDecrementProductFromBasket()

  const quantityPlus = () => incrementQuantity(productId)
  const quantityMinus = () => decrementQuantity(productId)

  const handlePreventDefault = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className={s['add-to-cart-button__wrap']}
      onClick={handlePreventDefault}
    >
      {product?.quantity === 0 ? (
        <CustomButton
          variant={'default'}
          onClick={quantityPlus}
          className={s['add-to-cart-button']}
          disabled={incrementPending}
        >
          Добавить в корзину
        </CustomButton>
      ) : (
        <div className={s['add-to-cart-button__basket-mode']}>
          <button
            onClick={quantityMinus}
            disabled={decrementPending}
            className={s['counter-button--minus']}
          ></button>
          <span className={s['counter']}>{product?.quantity}</span>
          <button
            onClick={quantityPlus}
            disabled={incrementPending}
            className={s['counter-button--plus']}
          ></button>
        </div>
      )}
    </div>
  )
}
