import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from '../externalServices/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

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
    request.userId = validationResult.userId;

    return true;
  }
}
