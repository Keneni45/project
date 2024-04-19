import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        username: Joi.string().required(),
        host: Joi.string().required(),
        port: Joi.number().required(),
        password: Joi.string().required(),
        database: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
