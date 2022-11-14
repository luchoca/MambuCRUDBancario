import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClientDto } from '../client dto/create-client.dto';
import { UpdateClientDto } from '../client dto/update-client.dto';
import { Address } from '../entities/address.entity';
import { Client } from '../entities/client.entity';
import { IdDocument } from '../entities/idDocument.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(IdDocument)
    private readonly idDocumentRepository: Repository<IdDocument>
  ) {}

  private readonly logger = new Logger('ProductosService'); // para ver mejor los errores en consola


  async create(createClientDto: CreateClientDto) {
    try {
      const cliente = this.clientRepository.create(createClientDto);
      await this.clientRepository.save(cliente);

      return cliente;
    } catch (error) {
      this.handleDBExceptions(error)
    }
    return 'This action adds a new client in DB';
  }


  async save(createClientDto: CreateClientDto){
    const existe = await this.clientRepository.findOneBy(createClientDto)
    if(!existe){
        return await this.clientRepository.save(createClientDto)
    }else{
        throw new BadRequestException('Ya esiste miaaaaamor!')

    }
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



  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Error inesperado mirar Logs');
  }
}
