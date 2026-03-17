import { useSearchParams } from 'react-router'

import { type SortOptionValue } from '@/features/catalogSortSelect/lib'

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    categoryIds: searchParams.getAll('categoryIds'),
    colorIds: searchParams.getAll('colorIds'),
    brandIds: searchParams.getAll('brandIds'),
    sort: (searchParams.get('sort') ?? 'newest') as SortOptionValue,
    search: searchParams.get('search') ?? '',
  }
  type filtersKey = keyof typeof filters

  const setParam = (key: filtersKey, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      value ? next.set(key, value) : next.delete(key)
      return next
    })
  }

  const setArrayParam = (key: filtersKey, values: string[]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete(key)
      values.forEach((v) => next.append(key, v))
      return next
    })
  }

  return { filters, setParam, setArrayParam, setSearchParams }
}
