import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  readonly phoneNo: string;
  @IsNotEmpty()
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
