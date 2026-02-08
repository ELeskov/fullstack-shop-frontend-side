import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { ROUTES } from '@/shared/config'
import type { ICategory } from '@/shared/types'
import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { DataTable } from '@/shared/ui/dataTable'

const columnHelper = createColumnHelper<ICategory>()

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
    size: 40,
    minSize: 30,
    maxSize: 200,
  }),

  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: () => <span>Описание</span>,

    size: 20,
    minSize: 20,
    maxSize: 50,
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
    size: 30,
    minSize: 25,
    maxSize: 150,
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
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem>Редактировать</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
    size: 10,
    minSize: 10,
    maxSize: 50,
  }),
]

const categories: ICategory[] = [
  {
    id: '1',
    title: 'Электроника',
    description: 'Электронные устройства и аксессуары',
    createdAt: '2023-01-15T10:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '2',
    title: 'Аудио',
    description: 'Аудиооборудование и наушники',
    createdAt: '2023-02-20T11:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '3',
    title: 'Гаджеты',
    description: 'Умные устройства и носимая электроника',
    createdAt: '2023-03-10T12:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '4',
    title: 'Игры',
    description: 'Игровые консоли и аксессуары',
    createdAt: '2023-04-05T13:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '5',
    title: 'Бытовая техника',
    description: 'Техника для дома и кухни',
    createdAt: '2023-05-12T14:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '6',
    title: 'Фототехника',
    description: 'Фотоаппараты, камеры и объективы',
    createdAt: '2023-06-18T15:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '7',
    title: 'Транспорт',
    description: 'Электросамокаты, велосипеды и транспортные средства',
    createdAt: '2023-07-22T16:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '8',
    title: 'Мебель',
    description: 'Мебель для дома и офиса',
    createdAt: '2023-08-30T17:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '9',
    title: 'Кухня',
    description: 'Кухонные принадлежности и техника',
    createdAt: '2023-09-14T18:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '10',
    title: 'Умный дом',
    description: 'Устройства для умного дома и автоматизации',
    createdAt: '2023-10-01T19:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '11',
    title: 'Одежда',
    description: 'Одежда, обувь и аксессуары',
    createdAt: '2023-11-05T20:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '12',
    title: 'Аксессуары',
    description: 'Различные аксессуары и гаджеты',
    createdAt: '2023-12-10T21:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '13',
    title: 'Хобби',
    description: 'Игрушки, конструкторы и хобби',
    createdAt: '2024-01-15T22:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '14',
    title: 'Здоровье',
    description: 'Товары для здоровья и фитнеса',
    createdAt: '2024-02-20T23:00:00Z',
    storeId: 'store-001',
  },
  {
    id: '15',
    title: 'Гейминг',
    description: 'Игровые аксессуары и оборудование',
    createdAt: '2024-03-01T00:00:00Z',
    storeId: 'store-001',
  },
]

export function CategoryDataTable() {
  const navigate = useNavigate()

  return (
    <DataTable<ICategory>
      data={categories}
      columns={defaultColumns}
      searchBy="title"
      onCreateClick={() => navigate(ROUTES.profile.shops.categories.create)}
      createButtonText="Создать"
    />
  )
}
