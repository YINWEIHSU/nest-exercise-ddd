import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { CounterpartyType } from '@libs/enums/counterpartyEnums'

@Entity({ name: 'counterparties' })
export class TypeOrmCounterpartyEntity {
  [key: string]: unknown
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CounterpartyType,
  })
  type: CounterpartyType;

  @Column()
  name: string;

  @Column({ nullable: true })
  identity_number?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ default: true })
  is_enable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}