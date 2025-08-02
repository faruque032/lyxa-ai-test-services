import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
})
export class Product {
  @ApiProperty({ description: 'Product ID', example: '507f1f77bcf86cd799439011' })
  id?: string;

  @ApiProperty({ description: 'Product name', example: 'MacBook Pro' })
  @prop({ required: true, trim: true })
  name: string;

  @ApiProperty({ description: 'Product description', example: 'High-performance laptop for professionals' })
  @prop({ required: true, trim: true })
  description: string;

  @ApiProperty({ description: 'Product price', example: 1999.99 })
  @prop({ required: true, min: 0 })
  price: number;

  @ApiProperty({ description: 'Product category', example: 'Electronics' })
  @prop({ required: true, trim: true })
  category: string;

  @ApiProperty({ description: 'Product stock quantity', example: 10 })
  @prop({ required: true, min: 0, default: 0 })
  stock: number;

  @ApiProperty({ description: 'Product image URLs', example: ['https://example.com/image1.jpg'] })
  @prop({ type: [String], default: [] })
  images: string[];

  @ApiProperty({ description: 'Product tags', example: ['laptop', 'apple', 'professional'] })
  @prop({ type: [String], default: [] })
  tags: string[];

  @ApiProperty({ description: 'User ID who owns this product', example: '507f1f77bcf86cd799439011' })
  @prop({ required: true })
  userId: string;

  @ApiProperty({ description: 'Product availability status', example: true })
  @prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Product creation date', example: '2023-01-01T00:00:00.000Z' })
  createdAt?: Date;

  @ApiProperty({ description: 'Product last update date', example: '2023-01-01T00:00:00.000Z' })
  updatedAt?: Date;
}
