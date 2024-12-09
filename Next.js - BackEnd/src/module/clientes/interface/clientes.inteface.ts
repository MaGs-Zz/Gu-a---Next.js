import { User } from 'src/module/auth/schema/auth.schema';

export interface IClientes{

    numero_identificacion: string;
    nombre_cliente: string;
    email_cliente: string;
    celular_cliente: string;
    activo_cliente?: boolean;
    user: User;
}