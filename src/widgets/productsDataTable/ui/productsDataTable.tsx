import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { ROUTES } from '@/shared/config'
import type { IProductDataTable } from '@/shared/types/product.interface'
import { Button } from '@/shared/ui/components/ui/button'
import { Checkbox } from '@/shared/ui/components/ui/checkbox'
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
import { useCopyText } from '@/shared/utils'

import { productsDataTable } from '../data/data'

const columnHelper = createColumnHelper<IProductDataTable>()

const defaultColumns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

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
    cell: (info) => info.getValue().title,
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
      return (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <div
              onClick={() => useCopyText(color.value)}
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
      const price = info.getValue()
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
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
  }),
]

export function ProductsDataTable() {
  const navigate = useNavigate()

  return (
    <DataTable<IProductDataTable>
      data={productsDataTable}
      columns={defaultColumns}
      searchBy="title"
      onCreateClick={() => navigate(ROUTES.profile.shops.products.create)}
      createButtonText="Создать"
    />
  )
}
