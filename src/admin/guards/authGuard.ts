import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequest } from '../types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    if (request.admin) {
      return true;
    }
    throw new HttpException('NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}
