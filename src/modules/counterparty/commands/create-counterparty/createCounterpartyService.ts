import { AggregateID } from '@libs/ddd'
import { Inject } from '@nestjs/common'
import { ConflictException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { TypeOrmCounterpartyRepositoryAdapter } from '../../database/counterpartyRepository'
import { CounterpartyEntity } from '../../domain/counterpartyEntity'
import { COUNTERPARTY_REPOSITORY } from '../../counterpartyDiTokens'
import { CreateCounterpartyCommand } from './createCounterpartyCommand'

@CommandHandler(CreateCounterpartyCommand)
export class CreateCounterpartyService
  implements ICommandHandler<CreateCounterpartyCommand, AggregateID> {
  constructor(
    @Inject(COUNTERPARTY_REPOSITORY)
    protected readonly counterpartyRepo: TypeOrmCounterpartyRepositoryAdapter
  ) { }

  async execute(command: CreateCounterpartyCommand): Promise<AggregateID> {
    // 檢查是否有重複的交易對手
    const isDuplicate = await this.counterpartyRepo.isCounterpartyDuplicate(
      command.type,
      command.name,
      command.identificationNumber,
    )

    if (isDuplicate) {
      throw new ConflictException({
        error: '資料重複',
        message: `交易對象的類型 '${command.type}'、名稱 '${command.name}' 及統編/身分證字號 '${command.identificationNumber}' 已經存在`,
      })
    }

    const counterparty = CounterpartyEntity.create({
      type: command.type,
      name: command.name,
      identificationNumber: command.identificationNumber,
      address: command.registeredAddress,
    })

    return await this.counterpartyRepo.transaction(async (entityManager) => {
      const id = await this.counterpartyRepo.insert(
        counterparty,
        entityManager,
      )

      // 返回聚合根 ID
      return id.toString()
    })
  }
}
