import { useEffect, useMemo, useState } from 'react'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, LoaderCircle, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import {
  useAdminDeleteUser,
  useAdminUpdateUser,
  useAdminUpdateUserRole,
  useGetAllUsers,
  useGetMe,
  useGetUserById,
} from '@/shared/api'
import type {
  SchemaUpdateRoleDto,
  SchemaUserResponseDto,
} from '@/shared/api/api-endpoints'
import { Badge } from '@/shared/ui/components/ui/badge'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
import { DataTable } from '@/shared/ui/dataTable'

import s from './adminUsersDataTable.module.scss'

const columnHelper = createColumnHelper<SchemaUserResponseDto>()

interface AdminUserActionsCellProps {
  user: SchemaUserResponseDto
  isCurrentUser: boolean
}

interface AdminEditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: SchemaUserResponseDto
  isCurrentUser: boolean
}

interface AdminDeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: SchemaUserResponseDto
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function AdminEditUserDialog({
  open,
  onOpenChange,
  user,
  isCurrentUser,
}: AdminEditUserDialogProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState<SchemaUpdateRoleDto['role']>(user.role)
  const { data: freshUser, isLoading: isUserLoading } = useGetUserById(
    open ? user.id : undefined,
  )
  const { mutateAsync: updateUser, isPending: isUserUpdatePending } =
    useAdminUpdateUser()
  const { mutateAsync: updateRole, isPending: isRoleUpdatePending } =
    useAdminUpdateUserRole()

  const targetUser = freshUser ?? user
  const isPending = isUserUpdatePending || isRoleUpdatePending

  useEffect(() => {
    if (!open) {
      return
    }

    setName(targetUser.name)
    setEmail(targetUser.email)
    setRole(targetUser.role)
  }, [open, targetUser.email, targetUser.name, targetUser.role])

  const handleSave = async () => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail) {
      toast.error('Имя и email обязательны')
      return
    }

    const isProfileChanged =
      trimmedName !== targetUser.name || trimmedEmail !== targetUser.email
    const isRoleChanged = role !== targetUser.role

    if (!isProfileChanged && !isRoleChanged) {
      toast.info('Изменений нет')
      onOpenChange(false)
      return
    }

    if (isProfileChanged) {
      await updateUser({
        userId: targetUser.id,
        body: {
          name: trimmedName,
          email: trimmedEmail,
        },
      })
    }

    if (isRoleChanged) {
      if (isCurrentUser) {
        toast.error('Нельзя изменить роль текущего администратора')
        return
      }

      await updateRole({
        userId: targetUser.id,
        role,
      })
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Редактирование пользователя</DialogTitle>
          <DialogDescription className="text-zinc-400">
            ID: {targetUser.id}
          </DialogDescription>
        </DialogHeader>

        {isUserLoading ? (
          <div className={s['admin-users-data-table__loader']}>
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`user-name-${targetUser.id}`}>Имя</Label>
              <Input
                id={`user-name-${targetUser.id}`}
                value={name}
                onChange={event => setName(event.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`user-email-${targetUser.id}`}>Email</Label>
              <Input
                id={`user-email-${targetUser.id}`}
                value={email}
                onChange={event => setEmail(event.target.value)}
                autoComplete="off"
                type="email"
              />
            </div>

            <div className="grid gap-2">
              <Label>Роль</Label>
              <Select
                value={role}
                onValueChange={value =>
                  setRole(value as SchemaUpdateRoleDto['role'])
                }
                disabled={isCurrentUser}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="REGULAR">REGULAR</SelectItem>
                </SelectContent>
              </Select>
              {isCurrentUser ? (
                <p className={s['admin-users-data-table__role-note']}>
                  Для текущего администратора смена роли запрещена.
                </p>
              ) : null}
            </div>
          </div>
        )}

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

function AdminDeleteUserDialog({
  open,
  onOpenChange,
  user,
}: AdminDeleteUserDialogProps) {
  const { mutateAsync: deleteUser, isPending } = useAdminDeleteUser()
  const [step, setStep] = useState<1 | 2>(1)
  const [confirmationEmail, setConfirmationEmail] = useState('')

  useEffect(() => {
    if (!open) {
      setStep(1)
      setConfirmationEmail('')
    }
  }, [open])

  const isEmailConfirmed =
    confirmationEmail.trim().toLowerCase() === user.email.toLowerCase()

  const handleDelete = async () => {
    await deleteUser({ userId: user.id })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Удалить пользователя?</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Будут удалены связанные данные пользователя. Действие
                необратимо.
              </DialogDescription>
            </DialogHeader>

            <p className={s['admin-users-data-table__danger-title']}>
              {user.name} ({user.email})
            </p>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Отмена
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setStep(2)}
              >
                Продолжить
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Финальное подтверждение</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Введите email пользователя для подтверждения удаления.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2">
              <Label htmlFor={`confirm-delete-${user.id}`}>Email</Label>
              <Input
                id={`confirm-delete-${user.id}`}
                value={confirmationEmail}
                onChange={event => setConfirmationEmail(event.target.value)}
                placeholder={user.email}
                autoComplete="off"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isPending}
              >
                Назад
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending || !isEmailConfirmed}
              >
                {isPending ? <LoaderCircle className="animate-spin" /> : null}
                Удалить пользователя
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function AdminUserActionsCell({
  user,
  isCurrentUser,
}: AdminUserActionsCellProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isRoleConfirmOpen, setIsRoleConfirmOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { mutateAsync: updateRole, isPending: isRoleUpdatePending } =
    useAdminUpdateUserRole()

  const targetRole: SchemaUpdateRoleDto['role'] =
    user.role === 'ADMIN' ? 'REGULAR' : 'ADMIN'

  const handleQuickRoleChange = async () => {
    await updateRole({
      userId: user.id,
      role: targetRole,
    })
    setIsRoleConfirmOpen(false)
  }

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
            disabled={isCurrentUser}
            onSelect={() => setIsRoleConfirmOpen(true)}
          >
            Сменить роль на {targetRole}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-400"
            disabled={isCurrentUser}
            onSelect={() => setIsDeleteOpen(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRoleConfirmOpen} onOpenChange={setIsRoleConfirmOpen}>
        <DialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle>Сменить роль пользователя?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Пользователь: {user.name} ({user.email})
            </DialogDescription>
          </DialogHeader>

          <p>
            Новая роль: <b>{targetRole}</b>
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRoleConfirmOpen(false)}
              disabled={isRoleUpdatePending}
            >
              Отмена
            </Button>
            <Button
              type="button"
              onClick={handleQuickRoleChange}
              disabled={isRoleUpdatePending}
            >
              {isRoleUpdatePending ? (
                <LoaderCircle className="animate-spin" />
              ) : null}
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdminEditUserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        user={user}
        isCurrentUser={isCurrentUser}
      />

      <AdminDeleteUserDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={user}
      />
    </>
  )
}

export function AdminUsersDataTable() {
  const { data: users = [], isLoading } = useGetAllUsers()
  const { data: currentUser } = useGetMe()

  const defaultColumns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: info => (
          <span className="font-mono text-xs text-zinc-300">
            {info.getValue()}
          </span>
        ),
        header: () => <span>ID</span>,
      }),
      columnHelper.accessor('name', {
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
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown />
          </Button>
        ),
      }),
      columnHelper.accessor('role', {
        cell: info => (
          <Badge
            variant={info.getValue() === 'ADMIN' ? 'default' : 'secondary'}
          >
            {info.getValue()}
          </Badge>
        ),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Роль
            <ArrowUpDown />
          </Button>
        ),
      }),
      columnHelper.accessor('isVerified', {
        cell: info => (
          <Badge variant={info.getValue() ? 'default' : 'outline'}>
            {info.getValue() ? 'Подтвержден' : 'Не подтвержден'}
          </Badge>
        ),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Верификация
            <ArrowUpDown />
          </Button>
        ),
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
        cell: ({ row }) => (
          <AdminUserActionsCell
            user={row.original}
            isCurrentUser={row.original.id === currentUser?.id}
          />
        ),
        enableHiding: false,
      }),
    ],
    [currentUser?.id],
  )

  if (isLoading) {
    return (
      <div className={s['admin-users-data-table__loader']}>
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <DataTable<SchemaUserResponseDto>
      data={users}
      columns={defaultColumns}
      searchBy="email"
    />
  )
}
