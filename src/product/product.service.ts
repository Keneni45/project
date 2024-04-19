import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  async getAllPost() {
    return 'hello world';
  }
}
