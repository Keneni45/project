import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntity from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
