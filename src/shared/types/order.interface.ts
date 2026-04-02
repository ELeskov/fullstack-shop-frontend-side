export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELED'

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
  product: PurchaseProduct | null
  review?: PurchaseItemReview | null
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrder {
  id: string
  status: OrderStatus
  total: number
  items: PurchaseOrderItem[]
  userId: string
  createdAt: string
  updatedAt: string
}
