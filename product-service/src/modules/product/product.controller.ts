import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto';
import { AuthGuard } from '../../common/guards';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createProductDto: CreateProductDto, @Request() req): Promise<ProductResponseDto> {
    return this.productService.create(createProductDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [ProductResponseDto] })
  async findAll(): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'q', description: 'Search query', required: true })
  @ApiResponse({ status: 200, description: 'Products found', type: [ProductResponseDto] })
  async searchProducts(@Query('q') query: string): Promise<ProductResponseDto[]> {
    return this.productService.searchProducts(query);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [ProductResponseDto] })
  async findByCategory(@Param('category') category: string): Promise<ProductResponseDto[]> {
    return this.productService.findByCategory(category);
  }

  @Get('my-products')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user products' })
  @ApiResponse({ status: 200, description: 'User products retrieved successfully', type: [ProductResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findMyProducts(@Request() req): Promise<ProductResponseDto[]> {
    return this.productService.findByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only update your own products' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req): Promise<ProductResponseDto> {
    return this.productService.update(id, updateProductDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only delete your own products' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: string, @Request() req): Promise<{ message: string }> {
    await this.productService.remove(id, req.user);
    return { message: 'Product deleted successfully' };
  }
}
