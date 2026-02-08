/*
usada para definir la estructura de un usuario en la aplicacion
*/ 

export interface IUser {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt?: Date;
}