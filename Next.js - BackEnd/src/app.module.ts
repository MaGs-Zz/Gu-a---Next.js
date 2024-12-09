import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';
import { ClientesModule } from './module/clientes/clientes.module';
import { ProductosModule } from './module/productos/productos.module';
import { AuthModule } from './module/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Variables accesibles de forma global
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 1,
      },
    ]),
    MongooseModule.forRoot('mongodb+srv://miguelgomezan439:MZDTwGmwJFaNUXng@cluster0.fjqxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ProveedoresModule,
    ClientesModule,
    ProductosModule,
    AuthModule,
  ],
})
export class AppModule {}