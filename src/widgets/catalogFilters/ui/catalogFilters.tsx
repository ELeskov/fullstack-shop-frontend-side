import { CatalogCheckboxFilter } from '@/features/catalogCheckboxFilter'
import { CatalogPriceFilter } from '@/features/catalogPriceFilter'
import { CatalogSortSelect } from '@/features/catalogSortSelect'

import { useGetAllCategories, useGetAllColors } from '@/shared/api'
import { useGetAllShops } from '@/shared/api/shop'
import { useCatalogFilters } from '@/shared/hooks'
import { Input } from '@/shared/ui/components/ui/input'

import s from './catalogFilters.module.scss'
import { CatalogFiltersSkeleton } from '@/widgets/catalogFilters/skeleton/catalogFiltersSekeleton'

export function CatalogFilters() {
  const { data: allCategories } = useGetAllCategories()
  const { data: allColors } = useGetAllColors()
  const { data: allBrands } = useGetAllShops()

  const { filters, setParam, setArrayParam, setSearchParams } =
    useCatalogFilters()
  const { minPrice, maxPrice, colorIds, categoryIds, brandIds, sort, search } =
    filters

  if (!allCategories || !allColors || !allBrands) {
    return <CatalogFiltersSkeleton />
  }

  return (
    <div className={s['filters-block__wrap']}>
      <div className={s['filters-block__container']}>
        <CatalogSortSelect
          value={sort}
          onChange={value => setParam('sort', value)}
        />

        <CatalogPriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={(min, max) => {
            setSearchParams(prev => {
              const next = new URLSearchParams(prev)
              min ? next.set('minPrice', min) : next.delete('minPrice')
              max ? next.set('maxPrice', max) : next.delete('maxPrice')
              return next
            })
          }}
        />

        <CatalogCheckboxFilter
          title="Категория"
          options={allCategories}
          selectedIds={categoryIds}
          onChange={value => setArrayParam('categoryIds', value)}
          showSearch={true}
        />

        <CatalogCheckboxFilter
          title="Бренд"
          options={allBrands}
          selectedIds={brandIds}
          onChange={value => setArrayParam('brandIds', value)}
          showSearch={true}
        />

        <CatalogCheckboxFilter
          title="Цвет"
          options={allColors}
          selectedIds={colorIds}
          onChange={value => setArrayParam('colorIds', value)}
          showSearch={true}
        />

        <Input
          type="text"
          name="search"
          placeholder="Найти"
          value={search}
          className="min-w-56"
          onChange={e => setParam('search', e.target.value)}
        />
      </div>
    </div>
  )
}
