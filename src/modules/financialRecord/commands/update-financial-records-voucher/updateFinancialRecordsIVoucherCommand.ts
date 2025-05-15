import { Command, CommandProps } from '@libs/ddd';

export class UpdateFinancialRecordsVoucherCommand extends Command {
  readonly financialRecordIds: string[];
  readonly voucherNumber: {
    accrualVoucherNumber?: string;
    actualVoucherNumber?: string;
  };

  constructor(
    props: CommandProps<UpdateFinancialRecordsVoucherCommand> & {
      financialRecordIds: string[];
      voucherNumber: {
        accrualVoucherNumber?: string;
        actualVoucherNumber?: string;
      };
    },
  ) {
    super(props);
    this.financialRecordIds = props.financialRecordIds;
    this.voucherNumber = props.voucherNumber;
  }
}