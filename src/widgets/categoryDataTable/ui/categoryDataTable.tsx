import { useNavigate } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { useDeleteCategoryMutation, useGetMeAllCategories } from '@/shared/api'
import type { SchemaCategoryResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { DataTable } from '@/shared/ui/dataTable'

const columnHelper = createColumnHelper<SchemaCategoryResponseDto>()

export function CategoryDataTable() {
  const navigate = useNavigate()

  const { data: categories = [] } = useGetMeAllCategories()
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategoryMutation()

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
        const categoryId = row.original.id

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem
                onClick={() => deleteCategory(categoryId)}
                className="text-rose-400"
                disabled={isDeleting}
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
    <DataTable<SchemaCategoryResponseDto>
      data={categories}
      columns={defaultColumns}
      searchBy="title"
      onCreateClick={() => navigate(ROUTES.profile.shops.categories.create)}
      createButtonText="Создать"
    />
  )
}
