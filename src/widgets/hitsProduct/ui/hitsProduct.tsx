import { LoaderCircle } from 'lucide-react'

import { ProductCard } from '@/entities/productCard'

import { useGetAllProduct } from '@/shared/api/product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/components/ui/carousel'

import s from './hitsProduct.module.scss'

export function HitsProduct() {
  const { data: products, isLoading } = useGetAllProduct()

  if (!products || isLoading) {
    return <LoaderCircle size={40} className="animate-spin" />
  }

  return (
    <section className={s['hits-product']}>
      <h2 className={s['hits-product__title']}>Хиты продаж</h2>
      <p className={s['hits-product__description']}>
        Самые популярные товары нашего магазина.
      </p>
      <div>
        <Carousel
          opts={{
            align: 'start',
          }}
        >
          <CarouselContent className={s['hits-product__product-list']}>
            {products.map(product => (
              <CarouselItem key={product.id}>
                <ProductCard
                  product={product}
                  className={s['hits-product__item']}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
