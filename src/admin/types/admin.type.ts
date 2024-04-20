import { AdminEntity } from '../entity/admin.entity';

export type AdminType = Omit<AdminEntity, 'hashPassword'>;
