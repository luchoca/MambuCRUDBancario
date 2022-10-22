import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { MambuService } from './client/service/mambu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ClientService } from './client/service/client.service';



@Module({
  imports: [
    HttpModule,
    ConfigModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        logging: process.env.ENV === 'production' ? false : true,
      }),
    }),
    ClientModule,
  ],  controllers: [],
  providers: [MambuService,ClientService],
})
export class AppModule {}
