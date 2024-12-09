import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../interface/user.interface'; // Importa la interfaz User
import { Document } from 'mongoose'; // Importa la clase Document de Mongoose
import { ERole } from '../enum/role.enum'; // Importa la enumeración ERole para los roles de usuario
import { IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator'; // Importa validadores para DTO


// Agrega auditoría al esquema, incluyendo timestamps para createdAt y updatedAt
@Schema({ timestamps: true })
export class User extends Document implements IUser {
    // Propiedad 'name' que es obligatorio
    @Prop({ required: true })
    @IsNotEmpty() // Valida que el nombre no esté vacío
    name: string;

    // Propiedad 'email' que debe ser único y obligatorio
    @Prop({ unique: true, message: 'Duplicate email entered' })
    @IsEmail() // Valida que el formato del email sea correcto
    @IsNotEmpty() // Valida que el email no esté vacío
    email: string;

    // Propiedad 'password' que es obligatoria
    @Prop({ required: true })
    @IsString() // Asegura que la contraseña sea una cadena de texto
    @IsNotEmpty() // Valida que la contraseña no esté vacía
    password: string;

    // Propiedad 'role' que es un arreglo de roles con un valor por defecto
    @Prop({
        type: [{ type: String, enum: ERole }],
        default: [ERole.USER], // Establece un rol por defecto como USER
    })
    @IsArray() // Asegura que la propiedad 'role' sea un arreglo
    roles: ERole[];
}

// Crea el esquema a partir de la clase User utilizando SchemaFactory de NestJS
export const UserSchema = SchemaFactory.createForClass(User);