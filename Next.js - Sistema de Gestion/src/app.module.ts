import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';
import { ClientesModule } from './module/clientes/clientes.module';
import { ProductosModule } from './module/productos/productos.module';

//MongooseModule.forRoot('mongodb+srv://juliriveraquintero:3bAwpBHC9iNii0UQ@pruebas.1hkhp.mongodb.net/PruebasNestJS?retryWrites=true&w=majority&appName=Pruebas'),


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Prueba'),
    ProveedoresModule,
    ClientesModule,
    ProductosModule,
    
  ],
  
})
export class AppModule {}
