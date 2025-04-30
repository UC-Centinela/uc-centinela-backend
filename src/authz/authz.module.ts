import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { CommonsModule } from '@commons/infrastructure/commons.module'

@Module({
  imports: [
    CommonsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [
    JwtStrategy
  ],
  exports: [PassportModule],
})
export class AuthzModule {}