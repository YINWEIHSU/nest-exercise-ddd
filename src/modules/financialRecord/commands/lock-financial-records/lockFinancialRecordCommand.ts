import { Command, CommandProps } from '@libs/ddd';


export class LockFinancialRecordCommand extends Command {
  readonly financialRecordIds: string[];

  constructor(
    props: CommandProps<LockFinancialRecordCommand> & {
      financialRecordIds: string[];
    },
  ) {
    super(props);
    this.financialRecordIds = props.financialRecordIds;
  }
}