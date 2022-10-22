import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { ClientService } from './client.service';

@Injectable()
export class MambuService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clientService: ClientService,
  ) {}

  async getAllClients() {
    const uri = `https://sofkamambudev.sandbox.mambu.com/api`;
    return this.httpService
      .get(uri)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getAddressesByClientId() {}
  async getIdDocumentsByClientId() {}
}
