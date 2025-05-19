import { TransactionType } from '@libs/enums/transactionTypeEnums'
import * as dayjs from 'dayjs'
import {
  Column,
  // ManyToOne,
  // JoinColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
// import { SubAccount } from '../../accounting/entities/sub-account.entity';
// import { Subsidiary } from '../../subsidiary/entities/subsidiary.entity';

@Entity({ name: 'financial_records' })
export class TypeOrmFinancialRecordEntity {
  [key: string]: unknown
  @PrimaryGeneratedColumn()
  public id: number // 注意：原代碼是 number 類型，但新範例是 string 類型

  @Column({ nullable: false })
  public subsidiary_id: number

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  public transaction_type: TransactionType

  @Column({ nullable: true })
  public counterparty_id: number

  @Column({ nullable: false })
  public sub_account_id: number

  @Column({
    type: 'date',
    nullable: false,
    transformer: {
      to: (value: string | null) => {
        if (!value) return null
        const formattedDate = dayjs(value).format('YYYY-MM-DD')
        return formattedDate
      },
      from: (value: Date | null) => {
        if (!value) return null
        const formattedDate = dayjs(value).format('YYYY-MM-DD')
        return formattedDate
      },
    },
  })
  public date: string

  @Column({ nullable: false })
  public currency_code: string

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 8,
    nullable: false,
    transformer: {
      to: (value: string | number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseFloat(value) : value,
    },
  })
  public exchange_rate: number

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 8,
    nullable: false,
    transformer: {
      to: (value: string | number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseFloat(value) : value,
    },
  })
  public adjusted_exchange_rate: number

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: string | number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseFloat(value) : value,
    },
  })
  public amount: number

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: string | number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseFloat(value) : value,
    },
  })
  public adjusted_amount: number

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: string | number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseFloat(value) : value,
    },
  })
  public TWD_amount: number

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: string | number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseFloat(value) : value,
    },
  })
  public adjusted_TWD_amount: number

  @Column({ type: 'varchar', nullable: true })
  public accrual_voucher_number: string | null

  @Column({ type: 'varchar', nullable: true })
  public actual_voucher_number: string | null

  @Column({ type: 'varchar', nullable: true })
  public invoice_number: string | null

  @Column({ type: 'varchar', nullable: true })
  public uniform_invoice_number: string | null

  @Column({
    type: 'date',
    nullable: true,
    transformer: {
      to: (value: string | null) => {
        if (!value) return null
        const formattedDate = dayjs(value).format('YYYY-MM-DD')
        return formattedDate
      },
      from: (value: Date | null) => {
        if (!value) return null

        const formattedDate = dayjs(value).format('YYYY-MM-DD')
        return formattedDate
      },
    },
  })
  public invoice_date: string | null

  @Column({ type: 'varchar', nullable: true })
  public note: string | null

  @Column({ default: false })
  public is_locked: boolean

  @Column({ default: false })
  public is_deleted: boolean

  @Column({ nullable: false })
  public creator_id: number

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date

  // 關聯
  // @ManyToOne(() => SubAccount)
  // @JoinColumn({ name: 'sub_account_id' })
  // public sub_account?: SubAccount;

  // @ManyToOne(() => Subsidiary)
  // @JoinColumn({ name: 'subsidiary_id' })
  // public subsidiary?: Subsidiary;
}
