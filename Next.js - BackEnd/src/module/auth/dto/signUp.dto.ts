import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { IUser } from '../interface/user.interface';
import { ERole } from '../enum/role.enum';
// Asegurate de importar el enum de roles

export class SignUpDto implements IUser {
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'El email es obligatorio.' })
    @IsEmail({}, { message: 'Formato de email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;

    @IsOptional()
    @IsArray() // Asegura que sea un arreglo
    @IsEnum(ERole, { each: true, message: 'Rol inválido.' }) // Valida que cada rol esté en el enum ERole
    roles?: ERole[]; // Marco como opcional
}