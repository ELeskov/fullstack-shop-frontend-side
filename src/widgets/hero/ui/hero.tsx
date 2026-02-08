import { motion } from 'motion/react'

import { animationTitleHeroText } from '@/widgets/hero/lib'

import { SwipeButton } from '@/shared/ui/swipeButton'

import s from './hero.module.scss'

export function Hero() {
  return (
    <section className={s['hero']}>
      <div className={s['hero__wrapper']}>
        <h1 className={s['hero__title']} aria-hidden="true">
          <span className="visually-hidden">
            Ваш шопинг, ваше удовольствие — все в одном месте
          </span>
          <div className={s['hero__title-animation']}>
            {animationTitleHeroText.map((word, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  filter: 'blur(10px)',
                  translateY: 20,
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  translateY: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04 + 0.3,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)', translateY: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', translateY: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.6 + 0.3,
          }}
          className={s['hero__description']}
        >
          Добро пожаловать в наш интернет-магазин — уникальную платформу для
          комфортного и безопасного шопинга.
        </motion.p>
        <SwipeButton />
      </div>
    </section>
  )
}
