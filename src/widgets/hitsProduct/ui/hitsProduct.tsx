import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { ProductCard } from '@/entities/productCard'

import s from './hitsProduct.module.scss'

const OPTIONS: EmblaOptionsType = {
  align: 'start',
  slidesToScroll: 1,
  containScroll: 'trimSnaps',
  dragFree: false,
  inViewThreshold: 0.5,
}

export function HitsProduct() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  return (
    <section className={s['hits-product']}>
      <h2 className={s['hits-product__title']}>Хиты продаж</h2>
      <p className={s['hits-product__description']}>
        Самые популярные товары нашего магазина.
      </p>
      <div className={s['hits-product__product-list']}>
        <div className={s['embla']} ref={emblaRef}>
          <div className={s['embla__viewport']}>
            <div className={s['embla__container']}>
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <div className={s['embla__slide']} key={index}>
                  <ProductCard className={s['hits-product__item']} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
