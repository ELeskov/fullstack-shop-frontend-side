import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import { ProductCard } from '@/entities/productCard'

import { useGetAllProductWithFilters } from '@/shared/api/product'
import { useCatalogFilters } from '@/shared/hooks'

import s from './productCardList.module.scss'

export function ProductCardList() {
  const { filters } = useCatalogFilters()

  const query = {
    ...(filters.categoryIds.length && { categoryIds: filters.categoryIds }),
    ...(filters.brandIds.length && { brandIds: filters.brandIds }),
    ...(filters.colorIds.length && { colorIds: filters.colorIds }),
    ...(filters.sort && { sort: filters.sort }),
    ...(filters.minPrice && { minPrice: +filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: +filters.maxPrice }),
    ...(filters.search && { search: filters.search }),
  }

  const { data: products, isLoading } = useGetAllProductWithFilters(query)

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
