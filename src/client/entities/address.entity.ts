import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid')
  encodedKey: string;

  @Column()
  parentKey: string;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  postcode: string;

  @Column()
  country: string;
  
  @Column()
  indexInList: number;

  @ManyToMany(()=>Client,(client)=>client.address)
  client: Client[];
}
