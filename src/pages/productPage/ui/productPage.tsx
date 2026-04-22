import { useParams } from 'react-router'

import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { ProductBody } from '@/widgets/productBody'
import { ProductMobileSummary } from '@/widgets/productMobileSummary'
import { ProductReviews } from '@/widgets/productReviews'
import { ProductSlider } from '@/widgets/productSlider'
import { ProductSummary } from '@/widgets/productSummary'

import { useGetProductById } from '@/shared/api/product'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './productPage.module.scss'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, isError } = useGetProductById(id ?? '')

  if (isLoading) {
    return <LoadingData />
  }

  if (isError || !product) {
    return (
      <EmptyData
        title="Не удалось загрузить товар"
        description="Попробуйте обновить страницу или открыть другой товар."
      />
    )
  }

  return (
    <section className={s['product-page']}>
      <Breadcrumbs />

      <div className={s['product-page__content']}>
        <ProductSlider images={product?.images ?? []} />
        <ProductBody product={product} />
        <ProductSummary product={product} />
      </div>

      <ProductMobileSummary product={product} />
      <ProductReviews productId={product.id} />
    </section>
  )
}
