import { LoaderCircle } from 'lucide-react'
import { AnimatePresence } from 'motion/react'

import { ProductCard } from '@/entities/productCard'

import { useGetAllProductWithFilters } from '@/shared/api/product'
import { useCatalogFilters } from '@/shared/hooks'

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
    <AnimatePresence mode="popLayout">
      <section className={'product-card-list'}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </AnimatePresence>
  )
}
