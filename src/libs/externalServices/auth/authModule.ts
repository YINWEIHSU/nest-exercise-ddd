import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './authService';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
  exports: ['IAuthService'],
})
export class AuthModule {}
