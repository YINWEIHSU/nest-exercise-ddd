import { AggregateID, AggregateRoot } from '@libs/ddd'
import { CreateEntityProps } from '@libs/ddd/entity.base'
import { ApplicationFormProps } from './applicationFormTypes'

export class ApplicationFormEntity extends AggregateRoot<ApplicationFormProps> {
  protected _id: AggregateID

  constructor(props: CreateEntityProps<ApplicationFormProps>) {
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

  validate(): void { }
}
