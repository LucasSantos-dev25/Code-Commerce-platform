import { Product, ProductDependency } from "@/generated/prisma/client";

export const PRODUCTS_REPOSITORY = 'IProductsRepository'


export type ProductWithDependencies = Product & {
    dependencies: ( ProductDependency & {
        requiredProduct:Product
    })[]
}

export type CreateProductData = {
    name: string
    slug: string
    description: string
    price: number
    type: 'BASE' | 'ADDON'
    imageUrl? : string
}

export interface IProductsRepository {
    findAll(): Promise<Product[]>
    findById(id:string): Promise<Product | null>
    findBySlug(slug:string): Promise<Product | null>
    findWithDependencies(id:string): Promise<ProductWithDependencies | null>
    create(data: CreateProductData) : Promise<Product>
    update(id:string, data:Partial<CreateProductData>): Promise<Product>
    delete(id:string): Promise<void>
}