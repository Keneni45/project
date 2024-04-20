import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from './product.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/postCreate.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly productRepositiry: Repository<PostEntity>,
  ) {}
  async getAllPost() {
    return this.productRepositiry.find();
  }
  async createPost(post: CreatePostDto) {
    const newPost = this.productRepositiry.create(post);
    await this.productRepositiry.save(newPost);
    return newPost;
  }
}
