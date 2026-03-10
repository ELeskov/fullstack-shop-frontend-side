import { Link } from 'react-router'

import { Star } from 'lucide-react'

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
  const mainOptionsGroup = product.groupedOptions?.[0].options

  return (
    <div className={s['product-body']}>
      <div className={s['product-body__header']}>
        <div className={s['product-body__badges']}>
          <Link to={`${ROUTES.profile.shops.root}${product.shopId}`}>
            <Badge variant={'secondary'} className={s['product-body__badge']}>
              Бренд
            </Badge>
          </Link>
        </div>

        <h3 className={s['product-body__title']}>
          Помада для волос, стайлинг для укладки, 30
        </h3>
        <div className={s['product-body__common-info']}>
          <div className={s['product-body__review']}>
            <Star size={13} className="text-yellow-500 fill-yellow-500" />
            <Link to={''} className={s['product-body__review-link']}>
              <span className={s['product-body__review-text']}>
                4,7{' · '}223 оценки
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={s['product-body__option']}>
        <ProductTableOption mainOptionsGroup={mainOptionsGroup ?? []} />
        <ProductMoreInfoSheet optionsGroup={product.groupedOptions ?? []} />
      </div>
    </div>
  )
}
