import { RequestWithUser } from '@libs/guards/authGuard'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>()
    return request.userId?.toString()
  },
)
