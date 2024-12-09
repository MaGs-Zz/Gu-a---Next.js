import { IsNotEmpty, IsString, IsBoolean, IsEmpty} from "class-validator";
import { User } from 'src/module/auth/schema/auth.schema';

//revisar 

export class CreateClientesDto{

    @IsNotEmpty()
    @IsString()
    numero_identificacion: string;

    @IsNotEmpty()
    @IsString()
    nombre_cliente: string;

    @IsNotEmpty()
    @IsString()
    email_cliente: string;

    @IsNotEmpty()
    @IsString()
    celular_cliente: string;

    @IsBoolean()
    activo_cliente?: boolean;

    @IsEmpty({ message: 'You can not pass user id' })
    user: User;
}
