import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    /** Método de registro para el usuario */
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { password, ...userData } = signUpDto;

        // Verifica si ya existe un usuario con el mismo email
        const existingUser = await this.userModel.findOne({ email: userData.email }).exec();
        if (existingUser) {
            throw new UnauthorizedException('El correo ya está registrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userModel.create({
            ...userData,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({
            id: newUser._id,
            name: newUser.name,
        });

        return { token };
    }

    /** Método de inicio de sesión */
    async login(logInDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = logInDto;

        const user = await this.userModel.findOne({ email }).exec();

        if (!user) {
            throw new UnauthorizedException('Email o contraseña inválidos.');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Email o contraseña inválidos.');
        }

        const payload = { id: user._id, name: user.name };
        const token = this.jwtService.sign(payload);

        return { token };
    }
}
