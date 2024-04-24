import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from './product.entity';
import { FindOneOptions, Repository } from 'typeorm';
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
  // async getPostById(id: number): Promise<PostEntity> {
  //   const post = await this.productRepositiry.findOne(id);
  //   if (post) {
  //     return post;
  //   }
  //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  // }
}
