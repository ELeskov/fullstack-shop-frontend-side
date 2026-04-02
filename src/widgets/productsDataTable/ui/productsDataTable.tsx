import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, LoaderCircle, MoreHorizontal } from 'lucide-react'

import type { SchemaProductResponseDto } from '@/shared/api/api-endpoints'
import {
  useDeleteProductMutation,
  useGetMeAllProductByShopId,
} from '@/shared/api/product'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/components/ui/hover-card'
import { DataTable } from '@/shared/ui/dataTable'
import { copyText } from '@/shared/utils'

const columnHelper = createColumnHelper<SchemaProductResponseDto>()

export function ProductsDataTable() {
  const navigate = useNavigate()

  const { data: products = [], isLoading } = useGetMeAllProductByShopId()
  const { mutateAsync } = useDeleteProductMutation()

  const defaultColumns = [
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
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

    columnHelper.accessor('category', {
      cell: (info) => info.getValue()?.title ?? 'Без категории',
      header: ({ column }) => (
        <Button
          className="px-0!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Категория
          <ArrowUpDown />
        </Button>
      ),
    }),

    columnHelper.accessor('color', {
      cell: (info) => {
        const color = info.getValue()

        if (!color) {
          return <span className="text-gray-400">-</span>
        }

        return (
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
              <div
                onClick={() => copyText(color.value)}
                className="h-6 w-6 rounded-[50%] border cursor-pointer hover:border-amber-50"
                style={{ backgroundColor: color.value }}
              ></div>
            </HoverCardTrigger>
            <HoverCardContent align="center" side="top" className="w-25">
              <span>{color.value}</span>
            </HoverCardContent>
          </HoverCard>
        )
      },
      header: () => <span>Цвет</span>,
    }),

    columnHelper.accessor('createdAt', {
      cell: (info) => {
        const createdAt = info.getValue()
        if (!createdAt) {
          return '-'
        }

        return new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(new Date(createdAt))
      },
      header: ({ column }) => (
        <Button
          className="px-0!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Дата создания
          <ArrowUpDown />
        </Button>
      ),
    }),

    columnHelper.accessor('price', {
      cell: (info) => {
        const price = info.getValue() || 0
        return new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }).format(price)
      },
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

    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel
              className="cursor-pointer"
              onClick={() =>
                navigate(ROUTES.profile.shops.products.edit.to(row.original.id))
              }
            >
              Редактировать
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => mutateAsync(row.original.id)}
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
    }),
  ]

  if (isLoading || !products) {
    return <LoaderCircle className="animate-spin" />
  }

  return (
    <DataTable<SchemaProductResponseDto>
      data={products}
      columns={defaultColumns}
      searchBy="title"
      onCreateClick={() => navigate(ROUTES.profile.shops.products.create)}
      createButtonText="Создать"
    />
  )
}
