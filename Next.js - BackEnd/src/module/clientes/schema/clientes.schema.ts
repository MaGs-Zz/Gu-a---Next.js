import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IClientes } from '../interface/clientes.inteface';
import { User } from 'src/module/auth/schema/auth.schema';
@Schema()
export class Clientes extends Document implements IClientes{
    
    @Prop ({require: true})
    numero_identificacion: string;

    @Prop ({required: true})
    nombre_cliente: string;

    @Prop ({required: true})
    email_cliente: string;

    @Prop ({required: true})
    celular_cliente: string;

    @Prop({default: true})
    activo_cliente?: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const ClientesSchema = SchemaFactory.createForClass(Clientes);