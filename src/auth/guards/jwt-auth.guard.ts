import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


/*
se crea un guardia de autenticación JWT con 
el objetivo de proteger las rutas que requieren autenticacion
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}