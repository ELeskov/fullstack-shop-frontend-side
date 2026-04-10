import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import {
  ArrowUpDown,
  ExternalLink,
  LoaderCircle,
  MoreHorizontal,
} from 'lucide-react'

import { useAdminDeleteProduct } from '@/shared/api'
import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import { useGetAllProduct } from '@/shared/api/product'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { DataTable } from '@/shared/ui/dataTable'

import s from './adminProductsDataTable.module.scss'

const columnHelper = createColumnHelper<SchemaProductResponseDto>()

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function ProductDeleteDialog({
  open,
  onOpenChange,
  product,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: SchemaProductResponseDto
}) {
  const { mutateAsync: deleteProduct, isPending } = useAdminDeleteProduct()

  const handleDelete = async () => {
    await deleteProduct({
      shopId: product.shop?.id,
      productId: product.id,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Удалить товар?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Товар <b>{product.title}</b> будет удален без возможности
            восстановления.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : null}
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ProductActionsCell({
  product,
}: {
  product: SchemaProductResponseDto
}) {
  const navigate = useNavigate()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Открыть меню</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => navigate(ROUTES.product.id(product.id))}
          >
            <ExternalLink />
            Открыть карточку
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-400"
            onSelect={() => setIsDeleteOpen(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProductDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        product={product}
      />
    </>
  )
}

export function AdminProductsDataTable() {
  const { data: products = [], isLoading } = useGetAllProduct()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: info => (
          <span className="font-mono text-xs text-zinc-300">
            {info.getValue()}
          </span>
        ),
        header: () => <span>ID</span>,
      }),
      columnHelper.accessor('title', {
        cell: info => info.getValue(),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Название
            <ArrowUpDown />
          </Button>
        ),
      }),
      columnHelper.accessor('price', {
        cell: info =>
          new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          }).format(info.getValue() || 0),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Цена
            <ArrowUpDown />
          </Button>
        ),
      }),
      columnHelper.accessor('shop.id', {
        cell: info => (
          <span className="font-mono text-xs text-zinc-300">
            {info.getValue()}
          </span>
        ),
        header: () => <span>Магазин (ID)</span>,
      }),
      columnHelper.accessor('category', {
        cell: info => info.getValue()?.title ?? '-',
        header: () => <span>Категория</span>,
      }),
      columnHelper.accessor('createdAt', {
        cell: info => formatDate(info.getValue()),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Создан
            <ArrowUpDown />
          </Button>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        cell: ({ row }) => <ProductActionsCell product={row.original} />,
        enableHiding: false,
      }),
    ],
    [],
  )

  if (isLoading) {
    return (
      <div className={s['admin-products-data-table__loader']}>
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <DataTable<SchemaProductResponseDto>
      data={products}
      columns={columns}
      searchBy="title"
    />
  )
}
