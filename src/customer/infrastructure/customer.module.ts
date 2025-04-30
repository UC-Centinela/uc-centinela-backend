import { Module } from '@nestjs/common'
import { CustomerService } from '../application/customer.service'
import { CustomerResolver } from './adapters/apollo/customer.resolver'
import { CustomerStorageAdapter } from './repository/customer.repository-adapter'
import { CustomerStorage } from './adapters/prisma/customer.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { UserModule } from '@user/infrastructure/user.module'

@Module({
  imports: [CommonsModule, UserModule],
  providers: [
    CommonsModule,
    CustomerResolver,
    CustomerService,
    CustomerStorage,
    PrismaService,
    {
      provide: 'ICustomerStorageAdapter',
      useClass: CustomerStorageAdapter,
    }
  ],
})
export class CustomerModule {}
