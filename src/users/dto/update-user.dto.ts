import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Updated Username',
    example: 'Deeksha Singh updated',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Updated Email',
    example: 'deeksha0811@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Updated password',
    example: 'password@123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Updated Role',
    enum: Role,
    example: Role.Instructor,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
