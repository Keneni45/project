import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { AdminResponseInterface } from './types/adminResponse.interface';
import { LoginAdminDto } from './dto/loginAdmin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //admin register request
  @Post('admin')
  @UsePipes(new ValidationPipe())
  async createAdmin(
    @Body('admin') createAdminDto: CreateAdminDto,
  ): Promise<AdminResponseInterface> {
    const admin = await this.adminService.createAdmin(createAdminDto);
    return this.adminService.buildAdminResponse(admin);
  }
  @Post('admin/login')
  @UsePipes(new ValidationPipe())
  async loginAdmin(
    @Body('admin') loginAdminDto: LoginAdminDto,
  ): Promise<AdminResponseInterface> {
    const admin = await this.adminService.loginAdmin(loginAdminDto);
    return this.adminService.buildAdminResponse(admin);
  }
}
