import { IsEmail, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"

/*
este Dto nos ayuda a validar que los datos que vienen
del login sean correctos
*/
export class LoginDto {
    @ApiProperty({ example: 'luis@example.com' })
    @IsEmail({}, { message: 'el email no es válido' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6, { message: 'la contraseña debe tener al menos 6 caracteres' })
    password: string;
}