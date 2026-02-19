import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { useGetMeAllColors } from '@/shared/api'
import type { SchemaColorResponseDto } from '@/shared/api/api-endpoints'
import { useDeleteColorMutation } from '@/shared/api/color/useDeleteColorMutation'
import { ROUTES } from '@/shared/config'
import { loadSelectedShopId } from '@/shared/helpers'
import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { DataTable } from '@/shared/ui/dataTable'

const columnHelper = createColumnHelper<SchemaColorResponseDto>()

export const ColorsDataTable = () => {
  const navigate = useNavigate()
  const activeShopId = loadSelectedShopId()
  const { data: colors = [] } = useGetMeAllColors(activeShopId!)
  console.log(colors)

  const { mutateAsync: deleteColor } = useDeleteColorMutation()

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
      cell: ({ row }) => {
        const colorId = row.original.id

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => deleteColor({ shopId: activeShopId!, colorId })}
                className="text-red-500"
              >
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableHiding: false,
    }),
  ]

  return (
    <DataTable<SchemaColorResponseDto>
      data={colors}
      columns={defaultColumns}
      searchBy="title"
      onCreateClick={() => navigate(ROUTES.profile.shops.colors.create)}
      createButtonText="Создать"
    />
  )
}
