import { OrderStatus } from '../enums'

export interface OrderItem {
  productId: string
  productName: string
  price: number
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  items: OrderItem[]
  totalPrice: number
  scopeUrl?: string
  createdAt: Date
}