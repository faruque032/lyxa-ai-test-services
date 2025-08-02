import { IsString, IsNumber, IsArray, IsOptional, IsBoolean, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'MacBook Pro' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Product description', example: 'High-performance laptop for professionals' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ description: 'Product price', example: 1999.99 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ description: 'Product category', example: 'Electronics' })
  @IsString()
  @MinLength(2)
  category: string;

  @ApiProperty({ description: 'Product stock quantity', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @ApiProperty({ description: 'Product image URLs', example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ description: 'Product tags', example: ['laptop', 'apple', 'professional'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Product name', example: 'MacBook Pro', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ description: 'Product description', example: 'High-performance laptop for professionals', required: false })
  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @ApiProperty({ description: 'Product price', example: 1999.99, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiProperty({ description: 'Product category', example: 'Electronics', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  category?: string;

  @ApiProperty({ description: 'Product stock quantity', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @ApiProperty({ description: 'Product image URLs', example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ description: 'Product tags', example: ['laptop', 'apple', 'professional'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Product availability status', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ProductResponseDto {
  @ApiProperty({ description: 'Product ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Product name', example: 'MacBook Pro' })
  name: string;

  @ApiProperty({ description: 'Product description', example: 'High-performance laptop for professionals' })
  description: string;

  @ApiProperty({ description: 'Product price', example: 1999.99 })
  price: number;

  @ApiProperty({ description: 'Product category', example: 'Electronics' })
  category: string;

  @ApiProperty({ description: 'Product stock quantity', example: 10 })
  stock: number;

  @ApiProperty({ description: 'Product image URLs', example: ['https://example.com/image1.jpg'] })
  images: string[];

  @ApiProperty({ description: 'Product tags', example: ['laptop', 'apple', 'professional'] })
  tags: string[];

  @ApiProperty({ description: 'User ID who owns this product', example: '507f1f77bcf86cd799439011' })
  userId: string;

  @ApiProperty({ description: 'Product availability status', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Product creation date', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Product last update date', example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
