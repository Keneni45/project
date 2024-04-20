import { Request } from 'express';
import { AdminEntity } from '../entity/admin.entity';

export interface ExpressRequest extends Request {
  admin?: AdminEntity;
}
