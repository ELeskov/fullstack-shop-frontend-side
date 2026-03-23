import { useNavigate } from 'react-router'

import { ChevronRight } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'motion/react'

import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'

import s from './swipeButton.module.scss'

export function SwipeButton() {
  const navigate = useNavigate()

  const x = useMotionValue(0)

  const opacity = useTransform(x, [0, 250], ['1', '0'])

  return (
    <div className={s['swipe-button__container']}>
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 800, bounceDamping: 13 }}
        dragElastic={0.55}
        initial={{ opacity: 0, filter: 'blur(10px)', translateY: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', translateY: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.7 + 0.3,
        }}
        style={{ x, opacity: opacity }}
        className={s['swipe-button__drag-container']}
        onDragEnd={(_, info) => {
          if (info.offset.x > 150) {
            navigate(ROUTES.catalog)
          }
        }}
      >
        <Button type="button" className={s['swipe-button']}>
          Перейти к покупкам
          <ChevronRight
            aria-hidden="true"
            className={s['swipe-button__icon']}
          />
        </Button>
      </motion.div>
    </div>
  )
}
