import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesService } from './service/clientes.service';
import { ClientesController } from './controller/clientes.controller';
import { Clientes, ClientesSchema } from './schema/clientes.schema';
import { AuthModule } from '../auth/auth.module'; 
import { APP_GUARD } from '@nestjs/core'; 
import { ThrottlerGuard } from '@nestjs/throttler'; 

@Module({
    imports: [
        AuthModule, 
        MongooseModule.forFeature([
            {
                name: Clientes.name,
                schema: ClientesSchema,
            },
        ]),
    ],
    controllers: [ClientesController],
    providers: [
        ClientesService,
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
    exports: [ClientesService], 
})
export class ClientesModule {}
