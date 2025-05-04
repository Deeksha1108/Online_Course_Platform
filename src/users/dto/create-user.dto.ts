import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'Deeksha',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User Email',
    example: 'deeksha08@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: 'pass@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User Role',
    enum: Role,
    example: Role.Student,
  })
  @IsEnum(Role)
  role: Role;
}
