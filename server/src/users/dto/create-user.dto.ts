import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'invalid email format!' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'invalid email format!' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  profileImage: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
