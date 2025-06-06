import { AggregateID, AggregateRoot } from '@libs/ddd'
import { CreateEntityProps } from '@libs/ddd/entity.base'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'
import { CounterpartyProps } from './counterpartyTypes'

export class CounterpartyEntity extends AggregateRoot<CounterpartyProps> {
  protected _id: AggregateID

  constructor(props: CreateEntityProps<CounterpartyProps>) {
    super(props)
    this._id = props.id
  }

  get id(): string {
    return this._id
  }

  get type(): CounterpartyType {
    return this.props.type
  }

  get name(): string {
    return this.props.name
  }

  get identityNumber(): string | undefined {
    return this.props.identityNumber
  }

  get address(): string | undefined {
    return this.props.address
  }

  get isEnable(): boolean {
    return this.props.isEnable
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  validate(): void {
    // 可加入領域驗證邏輯
  }
}