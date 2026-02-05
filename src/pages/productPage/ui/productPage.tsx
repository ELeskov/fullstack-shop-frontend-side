import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { ProductBody } from '@/widgets/productBody'
import { ProductMobileSummary } from '@/widgets/productMobileSummary'
import { ProductSlider } from '@/widgets/productSlider'
import { ProductSummary } from '@/widgets/productSummary'

import s from './productPage.module.scss'

export function ProductPage() {
  return (
    <section className={s['product-page']}>
      <Breadcrumbs />

      <div className={s['product-page__content']}>
        <ProductSlider />
        <ProductBody />
        <ProductSummary />
      </div>
      <ProductMobileSummary />
    </section>
  )
}
