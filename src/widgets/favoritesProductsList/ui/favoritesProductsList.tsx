import { ProductCard } from '@/entities/productCard'

import { useGetFavorites } from '@/shared/api/favorites/useGetFavorites'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

export function FavoritesProductsList() {
  const { data: favoritesProduct, isLoading } = useGetFavorites()

  if (isLoading) {
    return <LoadingData />
  }

  if (!favoritesProduct || !favoritesProduct.favoritesItems.length) {
    return <EmptyData title="Не удалось загрузить избранные" />
  }

  const { favoritesItems } = favoritesProduct
  return (
    <section className={'product-card-list'}>
      {favoritesItems.map(({ product }) => (
        <ProductCard
          key={product.id}
          product={{ ...product, isFavorite: true }}
        />
      ))}
    </section>
  )
}
