import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOneOptions, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { JWT_SECRET } from 'config';
import { sign } from 'jsonwebtoken';
import { AdminResponseInterface } from './types/adminResponse.interface';
import { AdminEntity } from './entity/admin.entity';
import { compare } from 'bcrypt';
import { LoginAdminDto } from './dto/loginAdmin.dto';

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
  async loginAdmin(loginAdminDto: LoginAdminDto): Promise<AdminEntity> {
    const options: FindOneOptions<AdminEntity> = {
      where: { email: loginAdminDto.email },
      select: ['id', 'phoneNo', 'password', 'email', 'username'],
    };
    const admin = await this.adminRepository.findOne(options);
    if (!admin) {
      throw new HttpException(
        'Credential are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(
      loginAdminDto.password,
      admin.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credential are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete admin.password;
    return admin;
  }
}
