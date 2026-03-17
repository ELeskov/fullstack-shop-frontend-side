export const SORT_OPTIONS = [
  {
    label: 'По новинкам',
    value: 'newest',
  },
  // {
  //   label: 'По рейтингу',
  //   value: 'rating',
  // },
  {
    label: 'Сначала дороже',
    value: 'price_desc',
  },
  {
    label: 'Сначала дешевле',
    value: 'price_asc',
  },
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]
export type SortOptionValue = SortOption['value']
