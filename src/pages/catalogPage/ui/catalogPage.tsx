import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { CatalogFilters } from '@/widgets/catalogFilters'
import { ProductCardList } from '@/widgets/productCardList'

import { TitlePage } from '@/shared/ui/titlePage/titlePage'

import s from './catalogPage.module.scss'

export function CatalogPage() {
  return (
    <section className={s['catalog-page']}>
      <div className={s['catalog-page__breadcrumbs']}>
        <Breadcrumbs />
      </div>
      <div className={s['catalog-title-wrap']}>
        <TitlePage text="Каталог" />
        <span className={s['number-product-found']}>
          {(142536).toLocaleString()} товаров
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
