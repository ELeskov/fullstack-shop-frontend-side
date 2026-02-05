import s from './productTableOption.module.scss'

interface ITableOptionRow {
  label: string
  value: string
}

interface IProductTableOption {
  arrayOption: ITableOptionRow[]
}

export function ProductTableOption({ arrayOption }: IProductTableOption) {
  if (!arrayOption) {
    return null
  }

  return (
    <div className={s['product-table-option']}>
      <table className={s['product-table-option__table']}>
        <tbody>
          {arrayOption.map((row) => (
            <tr className={s['product-table-option__table-row']}>
              <th>
                <span className={s['product-table-option__label']}>
                  {row.label}
                </span>
              </th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
