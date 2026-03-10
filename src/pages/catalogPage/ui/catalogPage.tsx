import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { CatalogFilters } from '@/widgets/catalogFilters'
import { ProductCardList } from '@/widgets/productCardList'

import { useGetAllProduct } from '@/shared/api/product'
import { TitlePage } from '@/shared/ui/titlePage/titlePage'

import s from './catalogPage.module.scss'

export function CatalogPage() {
  const { data: products } = useGetAllProduct()
  return (
    <section className={s['catalog-page']}>
      <div className={s['catalog-page__breadcrumbs']}>
        <Breadcrumbs />
      </div>
      <div className={s['catalog-title-wrap']}>
        <TitlePage text="Каталог" />
        <span className={s['number-product-found']}>
          {products?.length.toLocaleString()} товаров
        </span>
      </div>
      <div className={s['catalog-page__filters']}>
        <CatalogFilters />
      </div>
      <div className={s['catalog-page__main']}>
        <div className={s['catalog-page__content']}>
          <ProductCardList />
        </div>
      </div>
    </section>
  )
}
