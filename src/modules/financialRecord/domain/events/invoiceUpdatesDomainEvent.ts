import { DomainEvent, DomainEventProps } from '@libs/ddd'

export class InvoiceUpdatedDomainEvent extends DomainEvent {
  readonly invoiceNumber: string
  readonly uniformInvoiceNumber: string
  readonly invoiceDate: string

  constructor(props: DomainEventProps<InvoiceUpdatedDomainEvent>) {
    super(props)
    this.invoiceNumber = props.invoiceNumber
    this.uniformInvoiceNumber = props.uniformInvoiceNumber
    this.invoiceDate = props.invoiceDate
  }
}
