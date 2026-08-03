import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PRODUCTS_REPOSITORY } from './repositories/products.repository.interface';
import { PrismaProductsRepository } from './repositories/prisma-products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, {
    provide: PRODUCTS_REPOSITORY,
    useClass: PrismaProductsRepository

  }
],
})
export class ProductsModule {}
