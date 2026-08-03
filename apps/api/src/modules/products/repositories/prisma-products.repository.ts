import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { 
    IProductsRepository,
    CreateProductData,
    ProductWithDependencies 
} from "./products.repository.interface";
import { Product } from "@/generated/prisma/client";

@Injectable()
export class PrismaProductsRepository implements IProductsRepository{

    constructor( private readonly prisma:PrismaService){}

    async findAll(): Promise<Product[]>{
        return this.prisma.product.findMany({
            where:{isActive:true},
            orderBy:{createdAt:'asc'}
        })

    }

    async findById(id:string): Promise<Product | null>{
        return this.prisma.product.findUnique({
            where: {id}
        })
    }

    async findBySlug(slug:string):Promise<Product | null> {
        return this.prisma.product.findFirst({
            where:{slug}
        })
    }

    async findWithDependencies(id:string): Promise<ProductWithDependencies | null>{
        return this.prisma.product.findUnique({
            where:{id},
            include: {
                dependencies: {
                    include:{
                        requiredProduct: true
                    }
                }
            }

        })

    }

    async create(data:CreateProductData){
        return this.prisma.product.create({data})
    }

    async update(id:string, data: Partial<CreateProductData>): Promise<Product> {
        return this.prisma.product.update({
            where:{id},
            data
        })

    }

    async delete(id:string): Promise<void>{
        await this.prisma.product.update({
            where:{id},
            data: {isActive:false}
        })

    }
}