import { useEffect, useMemo, useState } from 'react'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, LoaderCircle, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import {
  useAdminDeleteShop,
  useAdminUpdateShop,
  useGetAllShops,
} from '@/shared/api'
import type { SchemaShopResponseDto } from '@/shared/api/api-endpoints'
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
import { Input } from '@/shared/ui/components/ui/input'
import { Label } from '@/shared/ui/components/ui/label'
import { DataTable } from '@/shared/ui/dataTable'

import s from './adminShopsDataTable.module.scss'

const columnHelper = createColumnHelper<SchemaShopResponseDto>()

interface ShopActionsCellProps {
  shop: SchemaShopResponseDto
}

interface ShopEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shop: SchemaShopResponseDto
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function ShopEditDialog({ open, onOpenChange, shop }: ShopEditDialogProps) {
  const [title, setTitle] = useState(shop.title)
  const [description, setDescription] = useState(shop.description)
  const { mutateAsync: updateShop, isPending } = useAdminUpdateShop()

  useEffect(() => {
    if (!open) {
      return
    }

    setTitle(shop.title)
    setDescription(shop.description)
  }, [open, shop.description, shop.title])

  const handleSave = async () => {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription) {
      toast.error('Название и описание обязательны')
      return
    }

    if (
      trimmedTitle === shop.title &&
      trimmedDescription === shop.description
    ) {
      toast.info('Изменений нет')
      onOpenChange(false)
      return
    }

    await updateShop({
      shopId: shop.id,
      body: {
        title: trimmedTitle,
        description: trimmedDescription,
      },
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Редактирование магазина</DialogTitle>
          <DialogDescription className="text-zinc-400">
            ID: {shop.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`shop-title-${shop.id}`}>Название</Label>
            <Input
              id={`shop-title-${shop.id}`}
              value={title}
              onChange={event => setTitle(event.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`shop-description-${shop.id}`}>Описание</Label>
            <Input
              id={`shop-description-${shop.id}`}
              value={description}
              onChange={event => setDescription(event.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : null}
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ShopDeleteDialog({
  open,
  onOpenChange,
  shop,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  shop: SchemaShopResponseDto
}) {
  const { mutateAsync: deleteShop, isPending } = useAdminDeleteShop()

  const handleDelete = async () => {
    await deleteShop({ shopId: shop.id })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Удалить магазин?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Магазин <b>{shop.title}</b> будет удален вместе со связанными
            данными.
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

function ShopActionsCell({ shop }: ShopActionsCellProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
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
          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-400"
            onSelect={() => setIsDeleteOpen(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ShopEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        shop={shop}
      />

      <ShopDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        shop={shop}
      />
    </>
  )
}

export function AdminShopsDataTable() {
  const { data: shops = [], isLoading } = useGetAllShops()

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
      columnHelper.accessor('description', {
        cell: info => info.getValue(),
        header: () => <span>Описание</span>,
      }),
      columnHelper.accessor('userId', {
        cell: info => (
          <span className="font-mono text-xs text-zinc-300">
            {info.getValue()}
          </span>
        ),
        header: () => <span>Владелец (ID)</span>,
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
        cell: ({ row }) => <ShopActionsCell shop={row.original} />,
        enableHiding: false,
      }),
    ],
    [],
  )

  if (isLoading) {
    return (
      <div className={s['admin-shops-data-table__loader']}>
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <DataTable<SchemaShopResponseDto>
      data={shops}
      columns={columns}
      searchBy="title"
    />
  )
}
