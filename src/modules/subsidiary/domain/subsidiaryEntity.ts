import { AggregateID, AggregateRoot } from '@libs/ddd'
import { CreateEntityProps } from '@libs/ddd/entity.base'
import { SubsidiaryProps } from './subsidiaryTypes'

export class SubsidiaryEntity extends AggregateRoot<SubsidiaryProps> {
  protected _id: AggregateID

  constructor(props: CreateEntityProps<SubsidiaryProps>) {
    super(props)
    this._id = props.id
  }

  /* Getters for read-only access */
  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get isEnable(): boolean {
    return this.props.isEnable
  }

  validate(): void {}
}
