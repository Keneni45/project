import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';

@Module({
  imports: [ConfigModule.forRoot({ validationSchema: Joi.object({
    host:Joi
  }) })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
