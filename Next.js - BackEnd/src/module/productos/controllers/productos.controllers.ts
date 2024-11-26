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
import { ProductosServices } from '../services/productos.services';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/udpate-productos.dto';
import { Productos } from '../schema/productos.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductosControllers {
    constructor(private readonly productsService: ProductosServices) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product successfully created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        description: 'Data required to create a new product',
        examples: {
            example: {
                summary: 'Example of creating a product',
                value: {
                    nombre_producto: 'Laptop',
                    cantidad: 100,
                    precio: 1500,
                    proveedor: ['1234567890', '0987654321'],
                    cliente: ['987654321'],
                    activo: true
                },
            },
        },
    })
    async create(@Body() createProductDto: CreateProductoDto): Promise<Productos> {
        return this.productsService.createProducto(createProductDto);
    }

    @Put('deactivate/:id')
    @ApiOperation({ summary: 'Deactivate a product by ID' })
    @ApiResponse({ status: 200, description: 'Product successfully deactivated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the product you want to deactivate',
        type: String,
    })
    async deactivate(@Param('id') id: string): Promise<void> {
        await this.productsService.deactivate(id);
    }

    @Put('activate/:id')
    @ApiOperation({ summary: 'Activate a product by ID' })
    @ApiResponse({ status: 200, description: 'Product successfully activated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the product you want to activate',
        type: String,
    })
    async activate(@Param('id') id: string): Promise<void> {
        await this.productsService.activate(id);
    }

    //////////

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiResponse({ status: 204, description: 'Product successfully deleted' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the product you want to delete',
        type: String,
    })
    async delete(@Param('id') id: string): Promise<void> {
        await this.productsService.delete(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get the list of all products' })
    @ApiResponse({ status: 200, description: 'Product list retrieved successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll(): Promise<Productos[]> {
        try {
            return await this.productsService.findAllProdutos();
        } catch (error) {
            throw new NotFoundException('Failed to retrieve products');
        }
    }


    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a product by ID' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({
        name: 'id',
        description: 'ID of the product you want to retrieve',
        type: String,
    })
    async findOne(@Param('id') id: string): Promise<Productos> {
        console.log('Received ID:', id); // Added for debugging
        return await this.productsService.findOne(id);
    }

    ////////

    @Put('update/:id')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiResponse({ status: 200, description: 'Product successfully updated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiBody({
        description: 'Data required to update a product',
        examples: {
            example: {
                summary: 'Example of updating a product',
                value: {
                    nombre_producto: 'Updated Product',
                    cantidad: 100,
                    precio: 150.5,
                    activo: true,
                    proveedor: ['supplier1', 'supplier2'],
                    cliente: ['client1'],
                },
            },
        },
    })
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductosDto): Promise<Productos> {
        const updatedProduct = await this.productsService.update(id, updateProductDto);
        if (!updatedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedProduct;
    }

    @Patch('updatePartial/:id')
    @ApiOperation({ summary: 'Partially update a product by ID' })
    @ApiResponse({ status: 200, description: 'Product partially updated successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiBody({
        description: 'Data required for partial update of a product',
        examples: {
            example: {
                summary: 'Example of partial update of a product',
                value: {
                    precio: 180.5,
                    cantidad: 120,
                },
            },
        },
    })
    async updatePartial(@Param('id') id: string, @Body() updateProductDto: UpdateProductosDto): Promise<Productos> {
        const updatedPartialProduct = await this.productsService.updatePartial(id, updateProductDto);
        if (!updatedPartialProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedPartialProduct;
    }

    @Patch(':productId/suppliers/:supplierId')
    @ApiOperation({ summary: 'Add a supplier to a product' })
    @ApiResponse({ status: 200, description: 'Supplier successfully added to the product' })
    @ApiResponse({ status: 404, description: 'Product or supplier not found' })
    @ApiParam({
        name: 'productId',
        description: 'ID of the product to which the supplier will be added',
        type: String,
    })
    @ApiParam({
        name: 'supplierId',
        description: 'ID of the supplier to be added to the product',
        type: String,
    })
    async addSupplierToProduct(
        @Param('productId') productId: string,
        @Param('supplierId') supplierId: string,
    ): Promise<Productos> {
        return await this.productsService.addSupplierToProduct(productId, supplierId);
    }

    /////////////

    @Patch(':productId/suppliers/:supplierId/remove')
    @ApiOperation({ summary: 'Remove a supplier from a product by their ID' })
    @ApiResponse({ status: 200, description: 'Supplier successfully removed from the product' })
    @ApiResponse({ status: 404, description: 'Product or supplier not found' })
    @ApiParam({
        name: 'productId',
        description: 'ID of the product from which the supplier will be removed',
        type: String,
    })
    @ApiParam({
        name: 'supplierId',
        description: 'ID of the supplier to be removed from the product',
        type: String,
    })
    async removeSupplierFromProduct(
        @Param('productId') productId: string,
        @Param('supplierId') supplierId: string
    ): Promise<Productos> {
        return await this.productsService.removeSupplierFromProduct(productId, supplierId);
    }

    @Patch(':productId/clients/:clientId')
    @ApiOperation({ summary: 'Add a client to a product by their ID' })
    @ApiResponse({ status: 200, description: 'Client successfully added to the product' })
    @ApiResponse({ status: 404, description: 'Product or client not found' })
    @ApiParam({
        name: 'productId',
        description: 'ID of the product to which the client will be added',
        type: String,
    })
    @ApiParam({
        name: 'clientId',
        description: 'ID of the client to be added to the product',
        type: String,
    })

    async addClientToProduct(
        @Param('productId') productId: string,
        @Param('clientId') clientId: string
    ): Promise<Productos> {
        return await this.productsService.addClientToProduct(productId, clientId);
    }

    @Patch(':productId/clients/:clientId/remove')
    @ApiOperation({ summary: 'Remove a client from a product by their ID' })
    @ApiResponse({ status: 200, description: 'Client successfully removed from the product' })
    @ApiResponse({ status: 404, description: 'Product or client not found' })
    @ApiParam({
        name: 'productId',
        description: 'ID of the product from which the client will be removed',
        type: String,
    })
    @ApiParam({
        name: 'clientId',
        description: 'ID of the client to be removed from the product',
        type: String,
    })


    async removeClientFromProduct(
        @Param('productId') productId: string,
        @Param('clientId') clientId: string
    ): Promise<Productos> {
        return await this.productsService.removeClientFromProduct(productId, clientId);
    }
}