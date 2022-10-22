import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Address } from '../entities/address.entity';
import { Client } from '../entities/client.entity';
import { IdDocument } from '../entities/idDocument.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ClientService {
  // constructor(
  //   @InjectRepository(Client)
  //   private readonly clientRepository: Repository<Client>,
  //   @InjectRepository(Address)
  //   private readonly addressRepository: Repository<Address>,
  //   @InjectRepository(IdDocument)
  //   private readonly idDocumentRepository: Repository<IdDocument>
  // ) {}



  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
