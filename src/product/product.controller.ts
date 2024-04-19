import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(productService: ProductService) {}
  @Get('/post')
  async getAllPost() {}
}
