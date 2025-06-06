import { AggregateID, AggregateRoot } from '@libs/ddd'
import { randomUUID } from 'crypto'
import { CreateEntityProps } from '@libs/ddd/entity.base'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'
import { CounterpartyProps, CreateCounterpartyProps } from './counterpartyTypes'


export class CounterpartyEntity extends AggregateRoot<CounterpartyProps> {
  protected _id: AggregateID

  constructor(props: CreateEntityProps<CounterpartyProps>) {
    super(props)
    this._id = props.id
  }

  static create(create: CreateCounterpartyProps): CounterpartyEntity {
    const id = randomUUID()
    const props: CounterpartyProps = {
      type: create.type,
      name: create.name,
      identityNumber: create.identificationNumber,
      address: create.address,
      isEnable: true,
    }
    const counterparty = new CounterpartyEntity({ id, props })
    return counterparty
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

  validate(): void {
    // 可加入領域驗證邏輯
  }
}