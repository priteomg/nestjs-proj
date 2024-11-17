/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://priteomg:${process.env.DBpassword}@cluster0.b39ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    ProductsModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
