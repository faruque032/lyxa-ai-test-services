import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'product_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
