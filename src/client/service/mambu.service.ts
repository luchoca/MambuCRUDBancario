import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { CreateClientDto } from '../client dto/create-client.dto';
import { UpdateClientDto } from '../client dto/update-client.dto';
import { Client } from '../entities/client.entity';
import { CreateLoanDto } from '../loan dto/create-loan.dto';
import { DisbursmentDto } from '../loan dto/disbursementDto.dto';
import { RepaymentDto } from '../loan dto/repayment.dto';
import { ClientService } from './client.service';

@Injectable()
export class MambuService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly clientService: ClientService,
  ) {}

  private header = {
    Accept: 'application/vnd.mambu.v2+json',
    apikey: this.config.get<string>('API_KEY'),
  };

  private url = this.config.get<string>('URL');


 /// <<<----CLIENTS---->>>> ///
  //OBTENER LOS CLIENTES QUE ESTAN EN LA API DE MAMBU
  async getAllClients() {
    const data = await lastValueFrom(
      this.httpService
        .get(
          `${this.url}/clients?offset=0&limit=10&paginationDetails=OFF&detailsLevel=FULL`,
          { headers: this.header },
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );

    return data;
  }

  async getClientById(Id: string) {
    const data = await firstValueFrom(
      this.httpService
        .get<Client>(`${this.url}/clients/${Id}?detailsLevel=FULL`, {
          headers: this.header,
        })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
    console.log('Se obtuvo Cliente por ID');

    return data;
  }

  //Crear un cliente,que se guarde en la api y se vea en la UI de mambu
  async createClientInMambu(createClientDto: CreateClientDto) {
    const data = await firstValueFrom(
      this.httpService
        .post(`${this.url}/clients`, createClientDto, { headers: this.header })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
    console.log(data);
    return data;
  }

  //Cambiar el estado de un cliente de INACTIVE a PENDING_APPROVAL
  async approbarCliente(clientId: string) {
    const body = [
      {
        op: 'REPLACE',
        path: 'state',
        value: 'PENDING_APPROVAL',
      },
    ];
    const data = await firstValueFrom(
      this.httpService
        .patch(`${this.url}/clients/${clientId}`, body, {
          headers: this.header,
        })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
    return data;
  }


  /// <<<----LOANS---->>>> ///

  //CREAR CUENTA DE PRESTAMO
  async crearLoanAccount(createLoanDto: CreateLoanDto) {
    const data = await firstValueFrom(
      this.httpService
        .post(`${this.url}/loans`, createLoanDto, { headers: this.header })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
    console.log('Se creo Credito');

    return data;
  }

  ///Obtener por Id
  async getLoanById(loanAccountId:string){
    const data = await firstValueFrom(
      this.httpService
        .get<Client>(`${this.url}/loans/?=${loanAccountId}&detailsLevel=FULL`, {
          headers: this.header,
        })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
    console.log('Se obtuvo Loan por ID');
    return data;
  }
  

  //APROBAR CUENTA DE PRESTAMO
  async aprobarCuentaPrestamo(loanAccountId: string) {
    const body = {
      action: 'APPROVE',
      notes: 'Se aprobo el prestamo',
    };
    const data = await firstValueFrom(
      this.httpService
        .post(`${this.url}/loans/${loanAccountId}:changeState`, body, {
          headers: this.header,
        })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );
    console.log('Se aprobo Credito');
    return data;
  }

  ////Desembolsar el dinero
  async desembolsarDinero(loanAccountId: string,disbursmentDto:DisbursmentDto) {
    const data = await firstValueFrom(
      this.httpService
        .post(`${this.url}/loans/${loanAccountId}/disbursement-transactions`, 
        disbursmentDto,
        {
          headers: this.header,
        })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );    
    console.log('Se Desembolso Credito');

    return data;
  }

  ///Repayment Transactions
  async repaymentTransactions(loanAccountId: string,repaymentDto: RepaymentDto) {
    const data = await lastValueFrom(
        this.httpService.post(`${this.url}/loans/${loanAccountId}/repayment-transactions`,repaymentDto, { headers: this.header })
            .pipe(map(resp => resp.data))
            .pipe(
              catchError(() => {
                throw new ForbiddenException('API not available');
              }),
            ),
    )
    console.log('Se Rembolso Credito');
    return data;
}


}

