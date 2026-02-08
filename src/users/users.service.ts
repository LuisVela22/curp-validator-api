import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUsersService } from './interfaces/users-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';


/*
aqui se hace la implementacion de los 
metodos del servicio
*/

@Injectable()
export class UsersService implements IUsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
        return user;
    }

    async findOneByEmail(email: string): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                // password: false <-- No es necesario ponerlo, con no incluirlo basta
                documents: true, // Si quieres traer sus documentos relacionados
            },
        });
    }


    async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });

        return updatedUser;
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.prisma.user.delete({
            where: { id },
        });
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.prisma.user.findMany();
    }

}
