import { Command, CommandProps } from '@libs/ddd';

export class UpdateFinancialRecordsInvoiceCommand extends Command {
  readonly financialRecordIds: string[];
  readonly invoiceInfo: {
    uniformInvoiceNumber: string;
    invoiceNumber: string;
    invoiceDate: string;
  };

  constructor(
    props: CommandProps<UpdateFinancialRecordsInvoiceCommand> & {
      financialRecordIds: string[];
      invoiceInfo: {
        uniformInvoiceNumber: string;
        invoiceNumber: string;
        invoiceDate: string;
      };
    },
  ) {
    super(props);
    this.financialRecordIds = props.financialRecordIds;
    this.invoiceInfo = props.invoiceInfo;
  }
}