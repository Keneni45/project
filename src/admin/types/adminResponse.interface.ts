import { AdminType } from './admin.type';

export interface AdminResponseInterface {
  admin: AdminType & { token: string };
}
