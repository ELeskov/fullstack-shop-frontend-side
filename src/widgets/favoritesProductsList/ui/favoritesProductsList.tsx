import { ProductCard } from '@/entities/productCard'

export function FavoritesProductsList() {
  return (
    <section className={'product-card-list'}>
      <ProductCard />
      <ProductCard />
    </section>
  )
}
