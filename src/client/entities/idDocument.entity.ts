import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Client } from './client.entity';


@Entity()
export class IdDocument {

  @PrimaryGeneratedColumn('uuid')
  encodedKey: string;

  @Column()
  clientKey: string;

  @Column()
  documentType: string;

  @Column()
  documentId: string;

  @Column()
  issuingAuthority: string;

  @Column()
  indexInList: number;

  @ManyToMany(()=>Client,(client)=>client.iddocument)
  client: Client[];
  
}
