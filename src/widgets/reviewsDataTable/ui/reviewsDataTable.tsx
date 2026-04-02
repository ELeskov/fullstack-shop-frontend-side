import { useMemo, useState } from 'react'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/components/ui/dialog'
import { Rating, RatingButton } from '@/shared/ui/components/ui/rating'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
import { DataTable } from '@/shared/ui/dataTable'

import s from './reviewsDataTable.module.scss'

type ReviewTableRow = {
  id: string
  productTitle: string
  authorName: string
  rating: number
  text: string
  createdAt: string
}

const mockReviews: ReviewTableRow[] = [
  {
    id: 'review-1',
    productTitle: 'Крючок под стол для сумок',
    authorName: 'Иван Петров',
    rating: 3,
    text: 'Удобный крючок, держится хорошо. Для тяжелого рюкзака хотелось бы более толстый металл.',
    createdAt: '2026-03-24T12:10:00.000Z',
  },
  {
    id: 'review-2',
    productTitle: 'Настольная лампа LED',
    authorName: 'Мария Соколова',
    rating: 5,
    text: 'Очень понравилась, особенно регулировка яркости и цветовой температуры.',
    createdAt: '2026-03-26T14:20:00.000Z',
  },
  {
    id: 'review-3',
    productTitle: 'Настольная лампа LED',
    authorName: 'Алексей Волков',
    rating: 4,
    text: '',
    createdAt: '2026-03-27T09:00:00.000Z',
  },
  {
    id: 'review-4',
    productTitle: 'Подставка для ноутбука',
    authorName: 'Екатерина Белова',
    rating: 2,
    text: 'Материал неплохой, но угол наклона мне не подошел.',
    createdAt: '2026-03-29T17:40:00.000Z',
  },
]

const columnHelper = createColumnHelper<ReviewTableRow>()

export function ReviewsDataTable() {
  const [selectedProduct, setSelectedProduct] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [openedReview, setOpenedReview] = useState<ReviewTableRow | null>(null)

  const productOptions = useMemo(
    () => [...new Set(mockReviews.map(review => review.productTitle))],
    [],
  )

  const filteredReviews = useMemo(() => {
    return mockReviews.filter(review => {
      const matchProduct =
        selectedProduct === 'all' || review.productTitle === selectedProduct

      const matchRating =
        selectedRating === 'all' || review.rating === Number(selectedRating)

      return matchProduct && matchRating
    })
  }, [selectedProduct, selectedRating])

  const defaultColumns = [
    columnHelper.accessor('authorName', {
      cell: info => info.getValue(),
      header: ({ column }) => (
        <Button
          className="px-0!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Имя
          <ArrowUpDown />
        </Button>
      ),
    }),

    columnHelper.accessor('productTitle', {
      cell: info => info.getValue(),
      header: ({ column }) => (
        <Button
          className="px-0!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Товар
          <ArrowUpDown />
        </Button>
      ),
    }),

    columnHelper.accessor('rating', {
      cell: info => (
        <div className="flex items-center">
          <Rating value={info.getValue()} readOnly className="text-yellow-300">
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton key={index} />
            ))}
          </Rating>
        </div>
      ),
      header: ({ column }) => (
        <Button
          className="px-0!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Оценка
          <ArrowUpDown />
        </Button>
      ),
    }),

    columnHelper.accessor('text', {
      cell: ({ row }) => {
        const text = row.original.text.trim()
        const preview = text || 'Без текста'

        return (
          <div className={s['reviews-data-table__review-cell']}>
            {text ? (
              <button
                type="button"
                className={s['reviews-data-table__review-link']}
                onClick={() => setOpenedReview(row.original)}
              >
                <span className={s['reviews-data-table__review-preview']}>
                  {preview}
                </span>
              </button>
            ) : (
              <span className={s['reviews-data-table__review-preview']}>
                {preview}
              </span>
            )}
            {text ? (
              <span className={s['reviews-data-table__review-hint']}>
                Нажмите для просмотра
              </span>
            ) : null}
          </div>
        )
      },
      header: () => <span>Текст</span>,
    }),

    columnHelper.accessor('createdAt', {
      cell: info =>
        new Date(info.getValue()).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      header: ({ column }) => (
        <Button
          className="px-0!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Дата
          <ArrowUpDown />
        </Button>
      ),
    }),
  ]

  return (
    <>
      <section className={s['reviews-data-table']}>
        <div className={s['reviews-data-table__filters']}>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className={s['reviews-data-table__filter']}>
              <SelectValue placeholder="Фильтр по товару" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все товары</SelectItem>
              {productOptions.map(productTitle => (
                <SelectItem key={productTitle} value={productTitle}>
                  {productTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className={s['reviews-data-table__filter']}>
              <SelectValue placeholder="Фильтр по оценке" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все оценки</SelectItem>
              {[5, 4, 3, 2, 1].map(rating => (
                <SelectItem key={rating} value={String(rating)}>
                  {rating} / 5
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={s['reviews-data-table__table-wrap']}>
          <DataTable<ReviewTableRow>
            data={filteredReviews}
            columns={defaultColumns}
            searchBy="productTitle"
          />
        </div>
      </section>

      <Dialog
        open={Boolean(openedReview)}
        onOpenChange={() => setOpenedReview(null)}
      >
        <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle>{openedReview?.authorName}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {openedReview?.productTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="mb-2">
            <Rating value={openedReview?.rating ?? 0} readOnly className="text-yellow-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} />
              ))}
            </Rating>
          </div>

          <p className={s['reviews-data-table__dialog-text']}>
            {openedReview?.text}
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
