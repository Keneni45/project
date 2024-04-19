import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
