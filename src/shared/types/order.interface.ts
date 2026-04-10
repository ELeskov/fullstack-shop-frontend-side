export type OrderStatus = 'PENDING' | 'PAYMENT_PENDING' | 'PAYED' | 'CANCELED'

export interface PurchaseProduct {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  shopId: string
  categoryId: string
  colorId: string | null
  createdAt: string
  updatedAt: string
}

export interface PurchaseItemReview {
  id?: string
  text: string
  rating: number
  createdAt?: string
  updatedAt?: string
}

export interface PurchaseOrderItem {
  id: string
  quantity: number
  price: number
  orderId: string
  productId: string | null
  shopId: string | null
  productTitleSnapshot: string | null
  productImageSnapshot: string | null
  productColorTitleSnapshot: string | null
  productColorValueSnapshot: string | null
  product: PurchaseProduct | null
  review?: PurchaseItemReview | null
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrder {
  id: string
  status: OrderStatus
  total: number
  paymentId: string | null
  paymentUrl: string | null
  paymentProvider: string | null
  paidAt: string | null
  items: PurchaseOrderItem[]
  userId: string
  createdAt: string
  updatedAt: string
}

export interface OrdersListResponse {
  items: PurchaseOrder[]
  total: number
  page: number
  pageSize: number
}

