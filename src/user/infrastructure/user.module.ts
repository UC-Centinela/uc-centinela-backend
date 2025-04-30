import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { UserService } from '@user/application/user.service'
import { UserResolver } from './adapters/apollo/resolvers/user.resolver'
import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { UserStorageAdapter } from './adapters/repository/user-prisma.repository'
import { UserStorage } from './adapters/prisma/user.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

@Module({
  imports: [CommonsModule],
  providers: [
    UserResolver, // Sería el equivalente a un contrlador
    PrismaService,
    UserStorage, 
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: IUserStorageAdapter,
      useClass: UserStorageAdapter
    }
  ],
  exports: [
    'IUserService'
  ]

})
export class UserModule {}
