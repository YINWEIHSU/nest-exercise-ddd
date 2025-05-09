import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from '../externalServices/auth';

export interface RequestWithUser extends Request {
  userId?: string;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard canActivate called');
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers['authorization'] as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid accessToken.');
    }

    const token = authHeader.split(' ')[1];
    const validationResult = await this.authService.validateUserToken(token);

    if (!validationResult.isValid) {
      throw new UnauthorizedException(
        validationResult.message || 'Unauthorized User',
      );
    }
    request.userId = validationResult.userId?.toString();

    return true;
  }
}
