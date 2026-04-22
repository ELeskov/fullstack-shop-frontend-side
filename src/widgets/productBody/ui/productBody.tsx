import { Link } from 'react-router'

import { ProductMoreInfoSheet } from '@/widgets/productMoreInfoSheet'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import { Badge } from '@/shared/ui/components/ui/badge'
import { ProductTableOption } from '@/shared/ui/productTableOption'

import s from './productBody.module.scss'

type ProductBodyProps = {
  product: SchemaProductResponseDto
}

export const ProductBody = ({ product }: ProductBodyProps) => {
  const groupedOptions = Array.isArray(product.groupedOptions)
    ? product.groupedOptions
    : []
  const mainOptionsGroup = groupedOptions?.[0]?.options ?? []
  const previewOptions = mainOptionsGroup.slice(0, 5)

  return (
    <div className={s['product-body']}>
      <div className={s['product-body__header']}>
        <div className={s['product-body__badges']}>
          <Link to={`${ROUTES.profile.shops.root}${product.shop?.id}`}>
            <Badge variant={'secondary'} className={s['product-body__badge']}>
              {product.shop?.title}
            </Badge>
          </Link>
        </div>

        <h3 className={s['product-body__title']}>{product.title || 'Товар'}</h3>
      </div>

      <div className={s['product-body__option']}>
        {previewOptions.length > 0 ? (
          <ProductTableOption mainOptionsGroup={previewOptions} />
        ) : (
          <p className={s['product-body__empty-option']}>
            Характеристики пока не заполнены.
          </p>
        )}

        <ProductMoreInfoSheet optionsGroup={groupedOptions} product={product} />
      </div>
    </div>
  )
}
