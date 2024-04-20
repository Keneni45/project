import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('host'),
        port: configService.get('port'),
        username: configService.get('username'),
        database: configService.get('database'),
        password: configService.get('password'),
        entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
