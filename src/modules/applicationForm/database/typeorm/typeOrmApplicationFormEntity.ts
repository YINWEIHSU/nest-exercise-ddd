import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'application_forms' })
export class TypeOrmApplicationFormEntity {
  [key: string]: unknown

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: false })
  public name: string

  @Column({ default: true })
  public is_enable: boolean
}
