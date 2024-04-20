import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreatePostDto } from './dto/postCreate.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('post')
  async getAllPost() {
    return this.productService.getAllPost();
  }
  @Post('create')
  async createPost(@Body('post') createPostDto: CreatePostDto) {
    const post = await this.productService.createPost(createPostDto);
    return post;
  }
}
