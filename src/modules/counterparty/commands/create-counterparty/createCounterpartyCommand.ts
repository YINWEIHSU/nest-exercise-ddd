import { Command, CommandProps } from '@libs/ddd'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'

export class CreateCounterpartyCommand extends Command {
  readonly type: CounterpartyType
  readonly name: string
  readonly identificationNumber?: string
  readonly registeredAddress?: string

  constructor(props: CommandProps<CreateCounterpartyCommand>) {
    super(props)
    this.type = props.type
    this.name = props.name
    this.identificationNumber = props.identificationNumber
    this.registeredAddress = props.registeredAddress
  }
}