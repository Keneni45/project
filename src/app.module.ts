import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AdminModule,
    ProductModule,

    ConfigModule.forRoot({
      validationSchema: Joi.object({
        username: Joi.string().required(),
        host: Joi.string().required(),
        port: Joi.number().required(),
        password: Joi.string().required(),
        database: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
