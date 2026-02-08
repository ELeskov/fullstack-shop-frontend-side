import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { ROUTES } from '@/shared/config'
import type { IColor } from '@/shared/types'
import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { DataTable } from '@/shared/ui/dataTable'

const columnHelper = createColumnHelper<IColor>()

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

  columnHelper.accessor('value', {
    cell: (info) => (
      <div
        className={`h-6 w-6 rounded-[50%] border`}
        style={{ backgroundColor: info.getValue() }}
      ></div>
    ),
    header: ({ column }) => (
      <Button
        className="px-0!"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Цвет
        <ArrowUpDown />
      </Button>
    ),
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => {
      const formattedDate = new Date(info.getValue()).toLocaleDateString(
        'ru-RU',
      )
      return formattedDate
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

  columnHelper.display({
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Открыть меню</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Редактировать</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
  }),
]

const colors: IColor[] = [
  {
    id: '1',
    title: 'Красный',
    value: '#FF0000',
    createdAt: '2023-01-15T10:30:00Z',
    storeId: 'store-001',
  },
  {
    id: '2',
    title: 'Зелёный',
    value: '#00FF00',
    createdAt: '2023-02-20T14:45:00Z',
    storeId: 'store-001',
  },
  {
    id: '3',
    title: 'Синий',
    value: '#0000FF',
    createdAt: '2023-03-10T09:15:00Z',
    storeId: 'store-001',
  },
  {
    id: '4',
    title: 'Чёрный',
    value: '#000000',
    createdAt: '2023-04-05T16:20:00Z',
    storeId: 'store-001',
  },
  {
    id: '5',
    title: 'Белый',
    value: '#FFFFFF',
    createdAt: '2023-05-12T11:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '6',
    title: 'Фиолетовый',
    value: '#800080',
    createdAt: '2023-06-18T13:30:00Z',
    storeId: 'store-001',
  },
  {
    id: '7',
    title: 'Оранжевый',
    value: '#FFA500',
    createdAt: '2023-07-22T08:45:00Z',
    storeId: 'store-001',
  },
  {
    id: '8',
    title: 'Жёлтый',
    value: '#FFFF00',
    createdAt: '2023-08-30T17:10:00Z',
    storeId: 'store-001',
  },
  {
    id: '9',
    title: 'Розовый',
    value: '#FFC0CB',
    createdAt: '2023-09-14T12:25:00Z',
    storeId: 'store-001',
  },
  {
    id: '10',
    title: 'Голубой',
    value: '#00CED1',
    createdAt: '2023-10-01T15:50:00Z',
    storeId: 'store-001',
  },
]

export const ColorsDataTable = () => {
  const navigate = useNavigate()

  return (
    <DataTable<IColor>
      data={colors}
      columns={defaultColumns}
      searchBy="title"
      onCreateClick={() => navigate(ROUTES.profile.shops.colors.create)}
      createButtonText="Создать"
    />
  )
}
