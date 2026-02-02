import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { ProductSlider } from '@/widgets/productSlider'

import s from './productPage.module.scss'

export function ProductPage() {
  return (
    <section className={s['product-page']}>
      <Breadcrumbs />

      <div className={s['product-page__content']}>
        <ProductSlider />
      </div>
    </section>
  )
}
