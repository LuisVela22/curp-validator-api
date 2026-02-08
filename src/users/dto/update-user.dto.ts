import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/*
se utiliza para actualizar un usuario existente, permitiendo que solo se proporcionen los campos que se desean modificar, sin requerir todos los campos obligatorios de CreateUserDto
*/

export class UpdateUserDto extends PartialType(CreateUserDto) {}