import type { SchemaProductOptionResponseDto } from '@/shared/api/api-endpoints'

import s from './productTableOption.module.scss'

interface IProductTableOption {
  mainOptionsGroup: SchemaProductOptionResponseDto[]
  fullmode?: boolean
}

export function ProductTableOption({
  mainOptionsGroup,
  fullmode = false,
}: IProductTableOption) {
  if (!mainOptionsGroup) {
    return null
  }

  return (
    <div className={s['product-table-option']}>
      <table className={s['product-table-option__table']}>
        <tbody>
          {mainOptionsGroup.map((row, i) => (
            <tr key={i} className={s['product-table-option__table-row']}>
              <th>
                <span className={s['product-table-option__label']}>
                  {row.name}
                </span>
              </th>
              <td className={fullmode ? s['fullmode'] : ''}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
