import { Command, CommandProps } from '@libs/ddd'

export class DeleteFinancialRecordsCommand extends Command {
  readonly ids: string[]

  constructor(
    props: CommandProps<DeleteFinancialRecordsCommand> & {
      ids: string[]
    },
  ) {
    super(props)
    this.ids = props.ids
  }
}
