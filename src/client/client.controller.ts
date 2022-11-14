import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ClientService } from './service/client.service';
import { CreateClientDto } from './client dto/create-client.dto';
import { UpdateClientDto } from './client dto/update-client.dto';
import { MambuService } from './service/mambu.service';
import { CreateLoanDto } from './loan dto/create-loan.dto';
import { DisbursmentDto } from './loan dto/disbursementDto.dto';
import { RepaymentDto } from './loan dto/repayment.dto';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly mambuService: MambuService,
  ) {}

  @Post('/CrearClient') //crear client y guardarlo en la BD mysql
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Post('/crearClientInMambu') //crear cliente en la UI de mambu
  createInMambu(@Body() createClientDto: CreateClientDto) {
    return this.mambuService.createClientInMambu(createClientDto);
  }

  @Get('/AllMambuClients') //obtener clientes que ya estan la api de Mambu
  findAll() {
    return this.mambuService.getAllClients();
  }

  @Get('/:clientId') //obtener el cliente por ID
  findClientById(@Param('clientId') clientId: string) {
    return this.mambuService.getClientById(clientId);
  }

  //cambiar el estado del cliente de Inactivo a Pendiente_Aprobado
  @Patch('/aprobarClient/:clientId')
  approve(@Param('clientId') clientId: string) {
    this.mambuService.approbarCliente(clientId);
    //  if(!clienteAprobado)
    //   throw new BadRequestException('No se pudo aprobar el Cliente')
    return {
      message: 'Se aprobo el cliente',
    };
  }

  /////LOANS
  //crear un credito 
  @Post('/crearLoans')
  crearLoan(@Body() createLoanDto: CreateLoanDto){
    return this.mambuService.crearLoanAccount(createLoanDto)
  };

  @Post('/aprobarLoans/:loanAccountId')
  approveLoanAccount(@Param('loanAccountId') loanAccountId: string){
    return this.mambuService.aprobarCuentaPrestamo(loanAccountId)
  }


  //Desembolsar el dinero
  @Post('/disbursementLoans/:loanAccountId')
  disbursementTransactions(
    @Param('loanAccountId') loanAccountId: string,
    @Body() disbursmentDto:DisbursmentDto
  ){
    return this.mambuService.desembolsarDinero(loanAccountId,disbursmentDto)
  }

  
  //Repayment / rembolso 
  @Post('/repaymentLoans/:loanAccountId')
  repaymentTransactions(
    @Param('loanAccountId') loanAccountId: string,
    @Body() repaymentDto: RepaymentDto
  ){
    return this.mambuService.repaymentTransactions(loanAccountId,repaymentDto)
  }

  @Get('/loans/?=loanAccountId')
  getLoanById(
    @Query('loanAccountId') loanAccountId: string
  ){
    return this.mambuService.getLoanById(loanAccountId)
  }



  // findOne(@Param('id') id: string) {
  //   return this.clientService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientService.update(+id, updateClientDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientService.remove(+id);
  // }



  // @Delete('loans') //cancelacion del prestamo solo cuando la deuda ya este cancelada
  // @Get(':id')
}
