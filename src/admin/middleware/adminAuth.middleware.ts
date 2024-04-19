import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminService } from '../admin.service';

import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'config';
import { ExpressRequest } from '../types/expressRequest.interface';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.admin = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET);
      console.log('decode');
      if (typeof decode === 'string') {
        throw new Error('Invalid token');
      }
      const admin = await this.adminService.findById(decode.id);
      req.admin = admin;

      next();
    } catch (error) {
      req.admin = null;
      next();
    }
  }
}
