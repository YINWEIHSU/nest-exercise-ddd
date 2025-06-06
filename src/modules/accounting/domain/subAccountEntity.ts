import { AggregateID, Entity } from '@libs/ddd'
import { CreateEntityProps } from '@libs/ddd/entity.base'
import { AccountProps } from './accountingTypes'

export class SubAccountEntity extends Entity<
  AccountProps & {
    mainAccountId: number
    applicationFormId: number
    isDebit: boolean
  }
> {
  protected _id: AggregateID

  constructor(
    props: CreateEntityProps<
      AccountProps & {
        mainAccountId: number
        applicationFormId: number
        isDebit: boolean
      }
    >,
  ) {
    super(props)
    this._id = props.id
  }

  get id(): string {
    return this._id
  }

  get mainAccountId(): number {
    return this.props.mainAccountId
  }

  get applicationFormId(): number {
    return this.props.applicationFormId
  }

  get isDebit(): boolean {
    return this.props.isDebit
  }

  toggleEnable(): void {
    this.props.isEnable = !this.props.isEnable
  }

  validate(): void {}
}
