import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '@libs/guards/authGuard';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.userId?.toString();
  },
);
