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

import { ProveedoresServices } from '../service/proveedores.service';
import { CreateProveedoresDto } from '../dto/create-proveedores.dto';
import { UpdateProveedoresDto } from '../dto/update-proveedores.dto';
import { Proveedores } from '../schema/proveedores.schema';

// Required import for documenting endpoints in Swagger
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Supplier') // Tag to group endpoints in the documentation
@Controller('suppliers') // Base route
export class ProveedoresController{


    constructor(private readonly proveedoresServies: ProveedoresServices)
    {

    }
    
    // Controller to create a Supplier
    @Post()
    // Endpoint description
    @ApiOperation({summary: 'Create a new supplier'}) 
    // Success response
    @ApiResponse({status: 201, description: 'The supplier has been created'}) 
    // Error response
    @ApiResponse({status: 400, description: 'Bad request'})
    // Request body description
    @ApiBody({
        description: 'Request body to create a new supplier',
        examples:{
            example:{
                summary: 'Creation example',
                value:{
                    supplier_name: 'Supplier_Name',
                    supplier_email: 'supplier@gmail.com',
                    supplier_phone: '1234567890'
                }
            }
        }
    })
    async create(@Body() createProveedorDto: CreateProveedoresDto): Promise<Proveedores>{
        return  this.proveedoresServies.createProveedor(createProveedorDto);
    }


    // Controller to deactivate a supplier
    @Put('deactivate/:id')
    // Endpoint description
    @ApiOperation({summary:'Deactivate a supplier'})
    // Success response
    @ApiResponse({status: 204, description: 'Supplier deactivated'})
    // Error response
    @ApiResponse({status:400, description:'Supplier not found'})
    // Error response
    @ApiResponse({status:404, description:'Bad request'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the supplier to deactivate',
        type: String,
    })
    async deactivate(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.deactivate(id);
    }


     // Controller to activate a supplier
    @Put('activate/:id')
    // Endpoint description
    @ApiOperation({summary:'Activate a supplier'})
    // Success response
    @ApiResponse({status: 204, description: 'Supplier activated'})
    // Error response
    @ApiResponse({status:400, description:'Supplier not found'})
    // Error response
    @ApiResponse({status:404, description:'Bad request'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the supplier to activate',
        type: String,
    })
    async activate(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.activate(id);
    }



    // Controller to delete a supplier
    @Delete('delete/:id')
        // Endpoint description
        @ApiOperation({summary:'Delete a supplier'})
        // Success response
        @ApiResponse({status: 204, description: 'Supplier deleted'})
        // Error response
        @ApiResponse({status:400, description:'Supplier not found'})
        // Error response
        @ApiResponse({status:404, description:'Bad request'})
        @ApiParam({
            name: 'id',
            required: true,
            description: 'ID of the supplier to delete',
            type: String,
        })
    async delete(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.delete(id);
    }


    // Controller to get all suppliers
    @Get()
    // Endpoint description
    @ApiOperation({summary: 'Get all suppliers'})
    // Success response
    @ApiResponse({status:200, description: 'List of suppliers', type:[Proveedores] })
    // Error response
    @ApiResponse({status: 404, description: 'Suppliers not found'})
    async findAll(): Promise<Proveedores[]>{
        return await this.proveedoresServies.findAll();
    }


    // Controller to get a supplier by id
    @Get(':id')
    // Endpoint description
    @ApiOperation({summary:'Get a supplier by its ID'})
    // Success response
    @ApiResponse({status: 204, description: 'Supplier found'})
    // Error response
    @ApiResponse({status:400, description:'Supplier not found'})
    // Error response
    @ApiResponse({status:404, description:'Bad request'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the supplier to retrieve',
        type: String,
    })
    async findOne(@Param('id') id: string): Promise<Proveedores>{
        return await this.proveedoresServies.findOne(id)
    }


    // Controller to update the entire supplier
    @Put('update/:id')

    // Endpoint description
    @ApiOperation({summary: 'Update a supplier'}) 
    // Success response
    @ApiResponse({status: 201, description: 'The supplier has been updated'}) 
    // Error response
    @ApiResponse({status: 400, description: 'Supplier not found'})
    // Error response
    @ApiResponse({status:404, description:'Bad request'})
    // Request body description
    @ApiBody({
        description: 'Request body to update a supplier',
        examples:{
            example:{
                summary: 'Update example',
                value:{
                    supplier_name: 'Updated_Supplier',
                    supplier_email: 'updatedsupplier@gmail.com',
                    supplier_phone: '1234567'
                }
            }
        }
    })
    
    async update(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
        const updateProveedor = await this.proveedoresServies.update(id, updateProveedoresDto);
        if(!updateProveedor){
            throw new NotFoundException(`Supplier with ID ${id} not found`);
        }
        return updateProveedor;
    }

    @Patch('updatePartial/:id')
    // Endpoint description
    @ApiOperation({summary: 'Partially update a supplier'}) 
    // Success response
    @ApiResponse({status: 201, description: 'The supplier has been updated'}) 
    // Error response
    @ApiResponse({status: 400, description: 'Supplier not found'})
    // Error response
    @ApiResponse({status:404, description:'Bad request'})
    // Request body description
    @ApiBody({
        description: 'Request body to partially update a supplier',
        examples:{
            example:{
                summary: 'Partial update example',
                value:{
                    supplier_name: 'Partial_Update_Supplier',
                    supplier_email: 'partialupdate@gmail.com',
                    supplier_phone: '12345674354'
                }
            }
        }
    })
    async updatePartial(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
        const updatePartialProveedor = await this.proveedoresServies.updatePartial(id, updateProveedoresDto);
        if(!updatePartialProveedor){
            throw new NotFoundException(`Supplier with ID ${id} not found`);
        }
        return updatePartialProveedor;
    }

}
