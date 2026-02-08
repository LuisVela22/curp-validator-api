import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from './user.interface';

/*
definimos la estructura de los metodos que se
tieen que implementar en el servicio de usuarios, esto es para
garantizar que cualquier clase que implemente esta interfaz, tendra estos metodos y se podra usar de manera consistente en toda la aplicacion
*/

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<IUser>;
  findOneByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<IUser>;
}