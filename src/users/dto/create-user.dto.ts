import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/*
representa la estructura de datos que se espera recibir al crear un nuevo usuario*/

export class CreateUserDto {
  @ApiProperty({ example: 'Luis Antonio Velasco' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'luis@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}