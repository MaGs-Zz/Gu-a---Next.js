import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'JWT_SECRET', // Ajusta según tu entorno
        });
    }

    async validate(payload: any) {
        const { id } = payload;
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            throw new UnauthorizedException('Usuario no autorizado.');
        }

        return user;
    }
}
