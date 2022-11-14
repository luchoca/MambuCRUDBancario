import { Address } from './address.entity';
import { IdDocument } from './idDocument.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Client {
  
  @PrimaryGeneratedColumn('uuid')
  encodedKey: string;

  @Column()
  id: string;

  @Column()
  creationDate: string;

  @Column()
  lastModifiedDate: string;

  @Column()
  activationDate?: string;

  @Column()
  approvedDate: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName?: string;

  @Column()
  homePhone?: string;

  @Column()
  mobilePhone?: string;

  @Column()
  emailAddress?: string;

  @Column()
  birthDate?: string;

  @Column()
  notes?: string;

  @Column()
  loanCycle: number;

  @Column()
  groupLoanCycle: number;

  // @Column()
  // groupKeys: any[];

  @ManyToMany(()=>Address,(address)=>address.client)
  @JoinTable({name:"client_address"})
  address: Address[];

  @ManyToMany(()=>IdDocument,(iddocument)=>iddocument.client)
  @JoinTable({name:"client_iddocument"})
  iddocument: IdDocument[];
}
