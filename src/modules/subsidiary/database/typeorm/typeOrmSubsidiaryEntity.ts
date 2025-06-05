import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'subsidiaries' })
export class TypeOrmSubsidiaryEntity {
  [key: string]: unknown

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: false })
  public name: string

  @Column({ default: true })
  public is_enable: boolean
}
