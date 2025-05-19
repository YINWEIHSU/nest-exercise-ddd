import { Command, CommandProps } from '@libs/ddd'

export class LockFinancialRecordsCommand extends Command {
  readonly financialRecordIds: string[]

  constructor(
    props: CommandProps<LockFinancialRecordsCommand> & {
      financialRecordIds: string[]
    },
  ) {
    super(props)
    this.financialRecordIds = props.financialRecordIds
  }
}
