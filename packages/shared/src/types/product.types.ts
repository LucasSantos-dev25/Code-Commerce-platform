import { ProductType, DependencyRule } from '../enums'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  type: ProductType
  imageUrl?: string
  isActive: boolean
}

export interface ProductDependency {
  productId: string
  requiresProductId: string
  rule: DependencyRule
  message: string
}