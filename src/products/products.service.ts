import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const result = new this.productModel(createProductDto);
    return result.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) return new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, UpdateProductDto: UpdateProductDto) {
    const result = await this.productModel
      .findByIdAndUpdate(id, UpdateProductDto, { new: true })
      .exec();
    if (!result) return new NotFoundException('Product not found');
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();

      if (!result) return new NotFoundException('Product not found');
      return 'Product deleted';
    } catch (error) {
      throw error;
    }
  }
}
