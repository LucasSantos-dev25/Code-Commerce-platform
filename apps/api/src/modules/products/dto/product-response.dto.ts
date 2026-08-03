import { Product } from "@/generated/prisma/client";

export class ProductResponseDto {

    id: string
    name:string
    slug: string
    description:string
    price:number
    type:string
    imageUrl: string | null
    isActive: boolean
    createdAt: Date

    static fromPrisma(product:Product): ProductResponseDto {

        return {
            id: product.id,
            name:product.name,
            slug: product.slug,
            description:product.description,
            price: Number(product.price),
            type: product.type,
            imageUrl: product.imageUrl,
            isActive: product.isActive,
            createdAt: product.createdAt
        }


    
    }

}

