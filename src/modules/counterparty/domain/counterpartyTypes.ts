import { CounterpartyType } from '@libs/enums/counterpartyEnums'

export interface CounterpartyProps {
    type: CounterpartyType
    name: string
    identityNumber?: string
    address?: string
    isEnable: boolean
    createdAt: Date
    updatedAt: Date
}


