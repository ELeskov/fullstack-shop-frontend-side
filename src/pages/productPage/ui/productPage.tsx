import { useParams } from 'react-router'

import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { ProductBody } from '@/widgets/productBody'
import { ProductMobileSummary } from '@/widgets/productMobileSummary'
import { ProductSlider } from '@/widgets/productSlider'
import { ProductSummary } from '@/widgets/productSummary'

import { useGetProductById } from '@/shared/api/product'

import s from './productPage.module.scss'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product } = useGetProductById(id ?? '')

  if (!product) {
    return 'loading'
  }

  return (
    <section className={s['product-page']}>
      <Breadcrumbs />

      <div className={s['product-page__content']}>
        <ProductSlider images={product?.images ?? []} />
        <ProductBody product={product} />
        <ProductSummary />
      </div>
      <ProductMobileSummary />
    </section>
  )
}
