import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
