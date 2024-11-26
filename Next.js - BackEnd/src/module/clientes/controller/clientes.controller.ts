import { 
    Controller, 
    Post, 
    Body, 
    Delete, 
    Param, 
    NotFoundException, 
    Get, 
    Put,
    Patch
} from '@nestjs/common';
import { UpdateClientesDto } from '../dto/update-clientes.dto';
import { CreateClientesDto } from '../dto/create-clientes.dto';
import { ClientesService } from '../service/clientes.service';
import { Clientes } from '../schema/clientes.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients') // Defines the base route
export class ClientesController {
    constructor(private readonly clientsService: ClientesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new client' })
    @ApiResponse({ status: 201, description: 'Client successfully created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        description: 'Data required to create a new client',
        examples: {
            example: {
                summary: 'Example of creating a client',
                value: {
                    numero_identificacion: '987654321',
                    nombre_cliente: 'MaGs MaGs',
                    email_cliente: 'mags.mags@gmail.com',
                    celular_cliente: '987-6543',
                    activo_cliente: true
                },
            },
        },
    })
    async create(@Body() createClientsDto: CreateClientesDto): Promise<Clientes> {
        return this.clientsService.createCliente(createClientsDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a client by ID' })
    @ApiResponse({ status: 200, description: 'Client found' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the client you want to retrieve',
        type: String,
    })
    async findOne(@Param('id') id: string): Promise<Clientes> {
        return await this.clientsService.findOne(id);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve the list of all clients' })
    @ApiResponse({ status: 200, description: 'List of clients successfully retrieved' })
    async findAll(): Promise<Clientes[]> {
        return await this.clientsService.findAll();
    }

    @Put('activate/:id')
    @ApiOperation({ summary: 'Activate a client by ID' })
    @ApiResponse({ status: 200, description: 'Client successfully activated' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the client you want to activate',
        type: String,
    })
    async activate(@Param('id') id: string): Promise<void> {
        await this.clientsService.active(id);
    }
    
    @Put('update/:id')
    @ApiOperation({ summary: 'Update a client by ID' })
    @ApiResponse({ status: 200, description: 'Client successfully updated' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    @ApiBody({
        description: 'Data required to update a client',
        examples: {
            example: {
                summary: 'Example of updating a client',
                value: {
                    nombre_cliente: 'MaGs Updated',
                    email_cliente: 'updated.email@gmail.com',
                    celular_cliente: '123-4567',
                    activo_cliente: false
                },
            },
        },
    })
    async update(@Param('id') id: string, @Body() updateClientsDto: UpdateClientesDto): Promise<Clientes> {
        const updatedClient = await this.clientsService.update(id, updateClientsDto);
        if (!updatedClient) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return updatedClient;
    }

    @Patch('updatePartial/:id')
    @ApiOperation({ summary: 'Partially update a client by ID' })
    @ApiResponse({ status: 200, description: 'Client partially updated successfully' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    @ApiBody({
        description: 'Data required for a partial update of the client',
        examples: {
            example: {
                summary: 'Example of partial update',
                value: {
                    celular_cliente: '555-8888',
                },
            },
        },
    })
    async updatePartial(@Param('id') id: string, @Body() updateClientsDto: Partial<UpdateClientesDto>): Promise<Clientes> {
        const updatedPartialClient = await this.clientsService.updatePartial(id, updateClientsDto);
        if (!updatedPartialClient) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return updatedPartialClient;
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a client by ID' })
    @ApiResponse({ status: 204, description: 'Client successfully deleted' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the client you want to delete',
        type: String,
    })
    async remove(@Param('id') id: string): Promise<void> {
        await this.clientsService.delete(id);
    }

    @Put('deactivate/:id')
    @ApiOperation({ summary: 'Deactivate a client by ID' })
    @ApiResponse({ status: 200, description: 'Client successfully deactivated' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the client you want to deactivate',
        type: String,
    })
    async deactivate(@Param('id') id: string): Promise<void> {
        await this.clientsService.deactivate(id);
    }
}