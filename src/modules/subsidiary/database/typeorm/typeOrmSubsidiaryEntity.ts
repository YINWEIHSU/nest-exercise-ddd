import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date
}
