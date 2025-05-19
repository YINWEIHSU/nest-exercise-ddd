import { routesV1 } from '@src/config/appRoutes'
import { IdResponse } from '@src/libs/api/id.response.dto'
import { CreateFinancialRecordRequestDto } from '@src/modules/financialRecord/commands/create-financial-record/createFinancialRecordRequestDto'
// import { UserPaginatedResponseDto } from '@src/modules/user/dtos/user.paginated.response.dto';
import { getTestServer } from '@tests/setup/jestSetupAfterEnv'

export class ApiClient {
  private url = `/${routesV1.version}/${routesV1.financialRecord.root}`
  private app = getTestServer().serverApplication

  async createFinancialRecord(
    dto: CreateFinancialRecordRequestDto,
  ): Promise<IdResponse> {
    const response = await this.app.inject({
      method: 'POST',
      url: this.url,
      payload: dto,
    })

    return JSON.parse(response.payload) as IdResponse
  }

  // async deleteUser(id: string): Promise<void> {
  //   const response = await getHttpServer().delete(`${this.url}/${id}`);
  //   return response.body;
  // }

  // async findAllUsers(): Promise<UserPaginatedResponseDto> {
  //   const response = await getHttpServer().get(this.url);
  //   return response.body;
  // }
}
