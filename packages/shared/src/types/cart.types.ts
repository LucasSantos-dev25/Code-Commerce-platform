import { Product } from './product.types'

export interface CartItem {
  productId: string
  product: Product
  quantity: number
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  total: number
}