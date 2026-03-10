import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import { ProductCard } from '@/entities/productCard'

import { useGetAllProduct } from '@/shared/api/product'

import s from './productCardList.module.scss'

export function ProductCardList() {
  const { data: products, isLoading } = useGetAllProduct()

  if (!products || isLoading) {
    return <LoaderCircle size={40} className="animate-spin" />
  }

  return (
    <section className={clsx(s['product-card-list'], 'product-card-list')}>
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </section>
  )
}
