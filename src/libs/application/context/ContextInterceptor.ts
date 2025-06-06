import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { RequestContextService } from './AppRequestContext'

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<any>()

    /**
     * Setting an ID in the global context for each request.
     * This ID can be used as correlation id shown in logs
     */
    const requestId = request?.body?.requestId

    RequestContextService.setRequestId(requestId)

    return next.handle().pipe(
      tap(() => {
        // Perform cleaning if needed
      }),
    )
  }
}
