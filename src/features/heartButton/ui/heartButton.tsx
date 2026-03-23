import { useState } from 'react'

import clsx from 'clsx'
import { Heart } from 'lucide-react'

import s from './heartButton.module.scss'

export function HeartButton({ className }: { className?: string }) {
  const [isLike, setIsLike] = useState<boolean>(false)
  return (
    <button
      aria-label="Добавить в корзину"
      className={clsx(s['heart-button'], className)}
      onClick={() => setIsLike(isLike => !isLike)}
    >
      <Heart
        size={24}
        className={clsx(
          s['heart-button__icon'],
          isLike && s['heart-button__icon--is-like'],
        )}
      />
    </button>
  )
}
