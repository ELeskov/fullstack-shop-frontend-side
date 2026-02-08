import { ProductCard } from '@/entities/productCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/components/ui/carousel'

import s from './hitsProduct.module.scss'

export function HitsProduct() {
  return (
    <section className={s['hits-product']}>
      <h2 className={s['hits-product__title']}>Хиты продаж</h2>
      <p className={s['hits-product__description']}>
        Самые популярные товары нашего магазина.
      </p>
      <div className={s['hits-product__product-list']}>
        <Carousel
          opts={{
            align: 'start',
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <CarouselItem key={i} className="basis-1/2 lg:basis-1/5 md:">
                <ProductCard className={s['hits-product__item']} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
