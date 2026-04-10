import { useMemo, useState } from 'react'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { useGetShopReviews } from '@/shared/api'
import { loadSelectedShopId } from '@/shared/helpers'
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
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './reviewsDataTable.module.scss'

type ReviewTableRow = {
  id: string
  productTitle: string
  authorName: string
  rating: number
  text: string
  createdAt: string
}

const columnHelper = createColumnHelper<ReviewTableRow>()

export function ReviewsDataTable() {
  const [selectedProduct, setSelectedProduct] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [openedReview, setOpenedReview] = useState<ReviewTableRow | null>(null)
  const shopId = loadSelectedShopId()

  const { data, isLoading, isError } = useGetShopReviews(shopId ?? '')

  const rows = useMemo<ReviewTableRow[]>(() => {
    if (!data) {
      return []
    }

    return data.map(review => ({
      id: review.id,
      productTitle: review.product.title,
      authorName: review.author.name,
      rating: review.rating,
      text: review.text,
      createdAt: review.createdAt,
    }))
  }, [data])

  const productOptions = useMemo(
    () => [...new Set(rows.map(review => review.productTitle))],
    [rows],
  )

  const filteredReviews = useMemo(() => {
    return rows.filter(review => {
      const matchProduct =
        selectedProduct === 'all' || review.productTitle === selectedProduct

      const matchRating =
        selectedRating === 'all' || review.rating === Number(selectedRating)

      return matchProduct && matchRating
    })
  }, [rows, selectedProduct, selectedRating])

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

  if (isLoading) {
    return <LoadingData />
  }

  if (isError) {
    return (
      <EmptyData
        title="Не удалось загрузить отзывы"
        description="Попробуйте обновить страницу."
      />
    )
  }

  if (!rows.length) {
    return (
      <EmptyData
        title="Отзывов пока нет"
        description="Когда покупатели оставят отзывы, они появятся здесь."
      />
    )
  }

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
            <Rating
              value={openedReview?.rating ?? 0}
              readOnly
              className="text-yellow-300"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} />
              ))}
            </Rating>
          </div>

          <p className={s['reviews-data-table__dialog-text']}>
            {openedReview?.text || 'Без текста'}
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
