import { Controller, Get, Body, Put, Delete,UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() 
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ summary: 'Obtener datos del usuario autenticado' })
    @Get()
    async getProfile(@Request() req) {
        return this.usersService.findById(req.user.userId);
    }

    @ApiOperation({ summary: 'Actualizar nombre, correo y campos básicos' })
    @Put()
    updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user.userId, updateUserDto);
    
    
    }

    @ApiOperation({ summary: 'Eliminar perfil del usuario autenticado' })
    @Delete()
    deleteProfile(@Request() req) {
        return this.usersService.deleteUser(req.user.userId);
    }


}
