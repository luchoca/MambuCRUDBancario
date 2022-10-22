import { Module } from '@nestjs/common';
import { ClientService } from './service/client.service';
import { ClientController } from './client.controller';
import { IdDocument } from './entities/idDocument.entity';
import { Address } from './entities/address.entity';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { MambuService } from './service/mambu.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Client,Address,IdDocument])
  ],
  controllers: [ClientController],
  providers: [ClientService,MambuService]
})
export class ClientModule {}
