import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, Copy, CreditCard, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import type { SchemaOrderResponseDto } from '@/shared/api/api-endpoints'
import {
  useGetOrderById,
  useGetOrders,
  usePayOrderMutation,
} from '@/shared/api/order'
import { ROUTES } from '@/shared/config'
import type { OrderStatus } from '@/shared/types/order.interface'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/components/ui/dialog'
import { DataTable } from '@/shared/ui/dataTable'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'
import { copyText } from '@/shared/utils'

import s from './ordersDataTable.module.scss'

type OrderTableRow = {
  id: string
  shortId: string
  totalQuantity: number
  total: number
  createdAt: string
  orderStatus: OrderStatus
}

const columnHelper = createColumnHelper<OrderTableRow>()

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: 'Не оплачен',
  PAYMENT_PENDING: 'Ожидает оплаты',
  PAYED: 'Оплачен',
  CANCELED: 'Отменен',
}

const ORDER_STATUS_CLASS: Record<OrderStatus, string> = {
  PENDING: s['orders-data-table__status--pending'],
  PAYMENT_PENDING: s['orders-data-table__status--processing'],
  PAYED: s['orders-data-table__status--paid'],
  CANCELED: s['orders-data-table__status--canceled'],
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

export function OrdersDataTable() {
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null)

  const {
    data: ordersResponse,
    isLoading: isOrdersLoading,
    isError,
  } = useGetOrders()

  const { data: openedOrder, isLoading: isOrderLoading } = useGetOrderById(
    openedOrderId ?? '',
    Boolean(openedOrderId),
  )

  const { mutateAsync: payOrder, isPending: isPaying } = usePayOrderMutation()

  const rows = useMemo<OrderTableRow[]>(() => {
    if (!ordersResponse) {
      return []
    }

    return ordersResponse.map(order => ({
      id: order.id,
      shortId: `#${order.id.slice(0, 8)}`,
      totalQuantity: order.products.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      total: order.total,
      createdAt: order.createdAt,
      orderStatus: order.orderStatus as OrderStatus,
    }))
  }, [ordersResponse])

  const fallbackOpenedOrder: SchemaOrderResponseDto | null =
    ordersResponse?.find(order => order.id === openedOrderId) ?? null

  const currentOpenedOrder: SchemaOrderResponseDto | null =
    openedOrder ?? fallbackOpenedOrder

  const handleOpenDetails = (orderId: string) => {
    setOpenedOrderId(orderId)
  }

  const handlePay = async (orderId: string) => {
    try {
      const result = await payOrder(orderId)

      if (!result?.confirmationUrl) {
        toast.error('Не удалось получить ссылку на оплату')
        return
      }

      window.location.assign(result.confirmationUrl)
    } catch {
      toast.error('Не удалось создать оплату')
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('shortId', {
        cell: ({ row }) => (
          <div className={s['orders-data-table__id-cell']}>
            <button
              type="button"
              className={s['orders-data-table__id-button']}
              onClick={() => handleOpenDetails(row.original.id)}
            >
              {row.original.shortId}
            </button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={s['orders-data-table__copy-btn']}
              onClick={() => copyText(row.original.id)}
            >
              <Copy size={14} />
            </Button>
          </div>
        ),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Номер заказа
            <ArrowUpDown />
          </Button>
        ),
      }),

      columnHelper.accessor('totalQuantity', {
        cell: info => info.getValue(),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Кол-во товаров
            <ArrowUpDown />
          </Button>
        ),
      }),

      columnHelper.accessor('total', {
        cell: info => formatCurrency(info.getValue()),
        header: ({ column }) => (
          <Button
            className="px-0!"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Общая сумма
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
            Дата создания
            <ArrowUpDown />
          </Button>
        ),
      }),

      columnHelper.accessor('orderStatus', {
        cell: info => {
          const status = info.getValue()

          return (
            <span
              className={`${s['orders-data-table__status']} ${ORDER_STATUS_CLASS[status]}`}
            >
              {ORDER_STATUS_LABEL[status]}
            </span>
          )
        },
        header: () => <span>Статус</span>,
      }),

      columnHelper.display({
        id: 'actions',
        cell: ({ row }) => {
          const isPaid = row.original.orderStatus === 'PAYED'
          const isCanceled = row.original.orderStatus === 'CANCELED'

          return (
            <div className={s['orders-data-table__actions']}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenDetails(row.original.id)}
              >
                Подробнее
              </Button>

              {!isPaid && !isCanceled ? (
                <Button
                  size="sm"
                  onClick={() => handlePay(row.original.id)}
                  disabled={isPaying}
                >
                  Оплатить
                </Button>
              ) : null}
            </div>
          )
        },
        enableHiding: false,
      }),
    ],
    [isPaying],
  )

  if (isOrdersLoading) {
    return <LoadingData />
  }

  if (isError) {
    return (
      <EmptyData
        title="Не удалось загрузить заказы"
        description="Попробуйте обновить страницу."
      />
    )
  }

  if (!ordersResponse || ordersResponse.length === 0) {
    return (
      <EmptyData
        title="Заказов пока нет"
        description="Когда вы оформите заказ, он появится здесь."
      />
    )
  }

  return (
    <>
      <section className={s['orders-data-table']}>
        <div className={s['orders-data-table__table-wrap']}>
          <DataTable<OrderTableRow>
            data={rows}
            columns={columns}
            searchBy="shortId"
          />
        </div>
      </section>

      <Dialog
        open={Boolean(openedOrderId)}
        onOpenChange={open => {
          if (!open) {
            setOpenedOrderId(null)
          }
        }}
      >
        <DialogContent className={s['orders-data-table__dialog']}>
          <DialogHeader className={s['orders-data-table__dialog-header']}>
            <DialogTitle className={s['orders-data-table__dialog-title']}>
              {currentOpenedOrder
                ? `Заказ #${currentOpenedOrder.id.slice(0, 8)}`
                : 'Заказ'}
            </DialogTitle>

            {currentOpenedOrder ? (
              <DialogDescription asChild>
                <span
                  className={`${s['orders-data-table__status']} ${
                    ORDER_STATUS_CLASS[
                      currentOpenedOrder.orderStatus as OrderStatus
                    ]
                  } ${s['orders-data-table__dialog-status']}`}
                >
                  {
                    ORDER_STATUS_LABEL[
                      currentOpenedOrder.orderStatus as OrderStatus
                    ]
                  }
                </span>
              </DialogDescription>
            ) : (
              <DialogDescription className="text-zinc-400">
                Загрузка заказа
              </DialogDescription>
            )}
          </DialogHeader>

          {isOrderLoading && !currentOpenedOrder ? (
            <div className={s['orders-data-table__loading']}>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <div className={s['orders-data-table__dialog-body']}>
              <ul className={s['orders-data-table__item-list']}>
                {currentOpenedOrder?.products.map((item, index) => {
                  const image = item.product?.images?.[0] ?? ''
                  const title = item.product?.title ?? 'Товар недоступен'
                  const color = item.product?.color?.title ?? 'Цвет не указан'
                  const price = item.product?.price ?? 0
                  const lineTotal = item.quantity * price
                  const productId = item.product?.id ?? null

                  return (
                    <li
                      key={`${item.product?.id ?? 'product'}-${index}`}
                      className={s['orders-data-table__item']}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className={s['orders-data-table__item-image']}
                        />
                      ) : (
                        <div className={s['orders-data-table__item-fallback']}>
                          Нет фото
                        </div>
                      )}

                      <div className={s['orders-data-table__item-content']}>
                        {productId ? (
                          <Link
                            to={ROUTES.product.id(productId)}
                            className={s['orders-data-table__item-title-link']}
                          >
                            {title}
                          </Link>
                        ) : (
                          <div className={s['orders-data-table__item-title']}>
                            {title}
                          </div>
                        )}

                        <div className={s['orders-data-table__item-color']}>
                          {color}
                        </div>
                      </div>

                      <div className={s['orders-data-table__item-meta']}>
                        <span className={s['orders-data-table__item-quantity']}>
                          × {item.quantity}
                        </span>
                        <span
                          className={s['orders-data-table__item-line-total']}
                        >
                          {formatCurrency(lineTotal)}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <DialogFooter className={s['orders-data-table__dialog-footer']}>
            <div className={s['orders-data-table__total-block']}>
              <span className={s['orders-data-table__total-label']}>Итого</span>
              <span className={s['orders-data-table__total']}>
                {formatCurrency(currentOpenedOrder?.total ?? 0)}
              </span>
            </div>

            {currentOpenedOrder &&
            currentOpenedOrder.orderStatus !== 'PAYED' &&
            currentOpenedOrder.orderStatus !== 'CANCELED' ? (
              <Button
                onClick={() => handlePay(currentOpenedOrder.id)}
                disabled={isPaying}
                className={s['orders-data-table__pay-btn']}
              >
                <CreditCard size={16} />
                Оплатить
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
