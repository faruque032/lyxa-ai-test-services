import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Product } from './product.model';
import { CreateProductDto, UpdateProductDto } from './dto';
import { AuthUser } from '../../common/interfaces';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: AuthUser): Promise<Product> {
    const product = new this.productModel({
      ...createProductDto,
      userId: user.id,
    });

    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ isActive: true }).exec();
  }

  async findByUser(userId: string): Promise<Product[]> {
    return this.productModel.find({ userId, isActive: true }).exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: AuthUser): Promise<Product> {
    const product = await this.findById(id);
    
    // Check if user owns the product
    if (product.userId !== user.id) {
      throw new ForbiddenException('You can only update your own products');
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  async remove(id: string, user: AuthUser): Promise<void> {
    const product = await this.findById(id);
    
    // Check if user owns the product
    if (product.userId !== user.id) {
      throw new ForbiddenException('You can only delete your own products');
    }

    const deletedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).exec();

    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ 
      category: { $regex: category, $options: 'i' }, 
      isActive: true 
    }).exec();
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchRegex = { $regex: query, $options: 'i' };
    
    return this.productModel.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: { $in: [searchRegex] } }
      ],
      isActive: true
    }).exec();
  }
}
