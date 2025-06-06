export interface AccountProps {
  name: string
  isEnable: boolean
}

export interface CreateAccountProps {
  id?: string
  name: string
}

export interface CreateSubAccountProps {
  mainAccountId: number
  name: string
  applicationFormId: number
  isDebit: boolean
}
