import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TypeOrmSubAccountEntity } from './typeOrmSubAccountEntity'

@Entity({ name: 'main_account' })
export class TypeOrmMainAccountEntity {
  [key: string]: unknown
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: false })
  public name: string

  @Column({ nullable: false })
  public is_enable: boolean

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date

  @OneToMany(
    () => TypeOrmSubAccountEntity,
    (subAccount) => subAccount.main_account,
  )
  public sub_accounts: TypeOrmSubAccountEntity[]
}
