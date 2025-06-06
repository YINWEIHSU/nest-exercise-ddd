import { CounterpartyType } from '@libs/enums/counterpartyEnums'

export interface CounterpartyProps {
    type: CounterpartyType
    name: string
    identityNumber?: string
    address?: string
    isEnable: boolean
}
export interface CreateCounterpartyProps {
    id?: string
    type: CounterpartyType
    name: string
    identificationNumber?: string
    address?: string
}


