import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';


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
  
}
