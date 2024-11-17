import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const product = await this.productsService.findOne(
      createOrderDto.productId,
    );

    if (!product) throw new NotFoundException('Product not found');

    const result = new this.orderModel(createOrderDto).save();

    return result;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('productId')
      .exec();

    return order;
  }
}
