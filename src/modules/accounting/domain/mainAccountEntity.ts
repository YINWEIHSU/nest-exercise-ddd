import { randomUUID } from 'crypto'
import { AggregateID, AggregateRoot } from '@libs/ddd'
import { CreateEntityProps } from '@libs/ddd/entity.base'
import {
  AccountProps,
  CreateAccountProps,
  CreateSubAccountProps,
} from './accountingTypes'
import { SubAccountEntity } from './subAccountEntity'

export class MainAccountEntity extends AggregateRoot<AccountProps> {
  protected _id: AggregateID
  private subAccounts: SubAccountEntity[] = []

  constructor(props: CreateEntityProps<AccountProps>) {
    super(props)
    this._id = props.id
  }

  static create(create: CreateAccountProps): MainAccountEntity {
    const id = randomUUID()
    const props: AccountProps = {
      ...create,
      isEnable: true,
    }
    return new MainAccountEntity({ id, props })
  }

  get id(): string {
    return this._id
  }

  getSubAccounts(): SubAccountEntity[] {
    return [...this.subAccounts] // immutable exposure
  }

  addSubAccount(create: CreateSubAccountProps): SubAccountEntity {
    const id = randomUUID()
    const subAccount = new SubAccountEntity({
      id,
      props: {
        ...create,
        isEnable: true,
      },
    })
    this.subAccounts.push(subAccount)
    return subAccount
  }

  removeSubAccount(subAccountId: string): void {
    this.subAccounts = this.subAccounts.filter((sa) => sa.id !== subAccountId)
  }

  toggleEnable(): void {
    this.props.isEnable = !this.props.isEnable
  }

  validate(): void {}
}
