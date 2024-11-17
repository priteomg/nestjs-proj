import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
