import { HttpService } from '@nestjs/axios'
// libs/externalServices/auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common'
import { externalUrl } from '@src/config/externalServiceConfig'
import { firstValueFrom } from 'rxjs'
import {
  IAuthService,
  UserValidationResult,
} from './interfaces/authServiceInterface'

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(private readonly httpService: HttpService) {}

  async validateUserToken(userToken: string): Promise<UserValidationResult> {
    try {
      const apisixToken = await this.fetchApisixToken()

      const validationResponse = await this.validateUser(apisixToken, userToken)

      if (validationResponse.status === 'success') {
        return {
          isValid: true,
          userId: validationResponse.data.user_id,
        }
      } else {
        return {
          isValid: false,
          message: validationResponse.message || 'Unauthorized user',
        }
      }
    } catch (error: any) {
      console.log(error)
      return {
        isValid: false,
        message: 'Authentication service error',
      }
    }
  }

  private async fetchApisixToken(): Promise<string> {
    const url = new URL(`${externalUrl.apisix.url}gen_token`)
    const searchParams = new URLSearchParams({
      key: externalUrl.apisix.sourceKey,
      payload: JSON.stringify({ source: 'FinancialSystem', key: null }),
    })

    url.search = searchParams.toString()

    try {
      const response = await firstValueFrom(
        this.httpService.get(url.toString()),
      )
      return response.data as string
    } catch (error: any) {
      console.log(error)
      throw new Error('Failed to fetch authentication token')
    }
  }

  private async validateUser(
    apisixToken: string,
    userToken: string,
  ): Promise<UserValidationResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${externalUrl.masa.url}api/v1/users/valid/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: apisixToken,
            'X-User': userToken,
          },
        }),
      )
      return response.data as UserValidationResponse
    } catch (error: any) {
      console.log(error)
      return {
        status: 'error',
        message: 'Failed to validate user token',
      }
    }
  }
}

type UserValidationResponse =
  | {
      status: 'error'
      message: string
    }
  | {
      status: 'success'
      data: { user_id: number }
    }
