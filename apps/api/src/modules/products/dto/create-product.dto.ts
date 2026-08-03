import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"


export enum ProductTypeDto{
    BASE = 'BASE',
    ADDON = 'ADDON'
    
}

export class CreateProductDto {
    @IsString()
    name:string

    @IsString()
    slug:string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsEnum(ProductTypeDto)
    type: ProductTypeDto

    @IsUrl()
    @IsOptional()
    imageUrl?: string
}
