import clsx from 'clsx'
import { Heart } from 'lucide-react'

import { useAddProductToFavorites } from '@/shared/api/favorites'
import { useDeleteProductFromFavorites } from '@/shared/api/favorites/useDeleteProductFromFavorites'

import s from './heartButton.module.scss'

export function HeartButton({
  isFavorite,
  productId,
  className,
}: {
  isFavorite: boolean
  className?: string
  productId: string
}) {
  const { mutateAsync: addProductToFavorites, isPending: isAdding } =
    useAddProductToFavorites()
  const { mutateAsync: deleteProductFromFavorites, isPending: isDeleting } =
    useDeleteProductFromFavorites()

  const handleAddToFavorites = () => addProductToFavorites(productId)
  const handleDeleteFromFavorites = () => deleteProductFromFavorites(productId)

  const isPending = isAdding && isDeleting

  return (
    <button
      aria-label="Добавить в корзину"
      className={clsx(s['heart-button'], className)}
      disabled={isPending}
      onClick={() =>
        isFavorite ? handleDeleteFromFavorites() : handleAddToFavorites()
      }
    >
      <Heart
        size={24}
        className={clsx(
          s['heart-button__icon'],
          isFavorite && s['heart-button__icon--is-like'],
        )}
      />
    </button>
  )
}
