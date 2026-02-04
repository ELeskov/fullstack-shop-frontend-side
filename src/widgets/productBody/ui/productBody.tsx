import { Link } from 'react-router'

import { Star } from 'lucide-react'

import { ROUTES } from '@/shared/config'
import { Badge } from '@/shared/ui/components/ui/badge'

import s from './productBody.module.scss'

export const ProductBody = () => {
  const product: any = {}

  return (
    <div className={s['product-body']}>
      <div className={s['product-body__header']}>
        <div className={s['product-body__badges']}>
          <Link to={`${ROUTES.profile.shops.root}${product.brand}`}>
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
        <table className={s['product-body__table']}>
          <tbody>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>Артикул</span>
              </th>
              <td>225918240</td>
            </tr>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>Состав</span>
              </th>
              <td>aqua; Ceteareth-20; PEG-7 Glyceryl Cocoate; PVP;...</td>
            </tr>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>
                  Степень фиксации средства
                </span>
              </th>
              <td>сильная фиксация; средняя фиксация</td>
            </tr>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>Действие</span>
              </th>
              <td>
                мужская укладка волос; эффект мокрых волос мужской; для...
              </td>
            </tr>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>Объем товара</span>
              </th>
              <td>30 мл</td>
            </tr>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>Срок годности</span>
              </th>
              <td>24 мес</td>
            </tr>
            <tr className={s['product-body__table-row']}>
              <th>
                <span className={s['product-body__label']}>
                  Страна производства
                </span>
              </th>
              <td>Россия</td>
            </tr>
          </tbody>
        </table>

        <Badge
          variant={'secondary'}
          // onClick={}
          className="cursor-pointer hover:bg-white/15 transition-all"
        >
          Характеристики и описание
        </Badge>
      </div>
    </div>
  )
}
