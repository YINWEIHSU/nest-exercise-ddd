import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { RequestWithUser } from '@src/libs/guards/authGuard'

@Injectable()
export class TestAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>()

    // 設置測試用戶 ID
    request.userId = '123'

    return true
  }
}
