import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TypeOrmFinancialRecordEntity } from './typeOrmFinancialRecordEntity'

@Entity({ name: 'financial_records_log' })
export class TypeOrmFinancialRecordLogEntity {
  [key: string]: unknown
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: false })
  public financial_record_id: number

  @Column({ nullable: false })
  public user_id: number

  @Column({
    type: 'json',
    nullable: true,
  })
  public old_values: Partial<TypeOrmFinancialRecordEntity>

  @Column({
    type: 'json',
    nullable: true,
  })
  public new_values: Partial<TypeOrmFinancialRecordEntity>

  @Column({ nullable: false })
  public change_reason: string

  @CreateDateColumn()
  public created_at: Date

  // relationships
  @ManyToOne(() => TypeOrmFinancialRecordEntity)
  @JoinColumn({ name: 'financial_record_id' })
  public financial_record?: TypeOrmFinancialRecordEntity
}
