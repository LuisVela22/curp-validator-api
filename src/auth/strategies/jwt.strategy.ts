import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


/*
se crea una estrategia encargada de validar el token JWT, esta estrategia se utiliza en el guard de autenticacion para proteger las rutas que requieren autenticacion
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKey_para_desarrollo',
        }); 
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}