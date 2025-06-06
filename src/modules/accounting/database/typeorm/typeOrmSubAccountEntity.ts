import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TypeOrmMainAccountEntity } from './typeOrmMainAccountEntity'
// import { Subsidiary } from '../../subsidiary/entities/subsidiary.entity';

@Entity({ name: 'sub_account' })
export class TypeOrmSubAccountEntity {
  [key: string]: unknown
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: false })
  public name: string

  @Column({ nullable: false })
  public main_account_id: number

  @Column({ nullable: false })
  public application_form_id: number

  @Column({ nullable: false })
  public is_debit: boolean

  @Column({ nullable: false })
  public is_enable: boolean

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date

  // 關聯
  @ManyToOne(() => TypeOrmMainAccountEntity)
  @JoinColumn({ name: 'main_account_id' })
  public main_account?: TypeOrmMainAccountEntity
}
