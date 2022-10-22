import { IsArray, IsInt, IsString, Min, MinLength } from 'class-validator';
import { Address } from '../entities/address.entity';
import { IdDocument } from '../entities/idDocument.entity';


export class CreateClientDto {


  @MinLength(1)
  @IsString()
  encodedKey: string;

  @MinLength(1)
  @IsString()
  id: string;

  @MinLength(1)
  @IsString()
  creationDate: string;

  @MinLength(1)
  @IsString()
  lastModifiedDate: string;

  @MinLength(1)
  @IsString()
  activationDate?: string;

  @MinLength(1)
  @IsString()
  approvedDate: string;

  @MinLength(1)
  @IsString()
  firstName: string;

  @MinLength(1)
  @IsString()
  lastName: string;

  @MinLength(1)
  @IsString()
  middleName?: string;

  @MinLength(1)
  @IsString()
  homePhone?: string;

  @MinLength(1)
  @IsString()
  mobilePhone?: string;

  @MinLength(1)
  @IsString()
  emailAddress?: string;

  @MinLength(1)
  @IsString()
  birthDate?: string;

  @MinLength(1)
  @IsString()
  notes?: string;

  @Min(1)
  @IsInt()
  loanCycle: number;

  @Min(1)
  @IsInt()
  groupLoanCycle: number;

  // @MinLength(1)
  addresses: Address[];
  
  // @MinLength(1)
  idDocuments: IdDocument[];
}