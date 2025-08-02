import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductModule } from './modules/product/product.module';
import { HealthModule } from './modules/health/health.module';
import { configValidationSchema } from './config/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
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
    ProductModule,
    HealthModule,
  ],
})
export class AppModule {}
