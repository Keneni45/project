import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOneOptions, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { JWT_SECRET } from 'config';
import { sign } from 'jsonwebtoken';
import { AdminResponseInterface } from './types/adminResponse.interface';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}
  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    const adminByEmail = await this.adminRepository.findOneBy({
      email: createAdminDto.email,
    });
    const adminByPhoneNo = await this.adminRepository.findOneBy({
      phoneNo: createAdminDto.phoneNo,
    });
    if (adminByEmail || adminByPhoneNo) {
      throw new HttpException(
        'Email or Phone No is taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newAdmin = new AdminEntity();
    Object.assign(newAdmin, createAdminDto);
    return this.adminRepository.save(newAdmin);
  }
  async findById(id: number) {
    const options: FindOneOptions<AdminEntity> = {
      where: { id },
    };
    return this.adminRepository.findOne(options);
  }
  generateJWT(admin: AdminEntity): string {
    const token = sign(
      {
        id: admin.id,
        email: admin.email,
        password: admin.password,
      },
      JWT_SECRET,
    );
    return token;
  }
  buildAdminResponse(admin: AdminEntity): AdminResponseInterface {
    return {
      admin: {
        ...admin,
        token: this.generateJWT(admin),
      },
    };
  }
}
