import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  readonly title: string;
  @IsNotEmpty()
  readonly content: string;
}
