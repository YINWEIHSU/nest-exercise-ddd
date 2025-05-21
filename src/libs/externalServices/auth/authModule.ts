import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AuthService } from './authService'

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
