// Code: Main module of the application, it imports all the modules and the GraphQL module
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { UserModule } from './user/infrastructure/user.module'

// Import app modules
import { CustomerModule } from '@customer/infrastructure/customer.module'
import { AuthzModule } from 'authz/authz.module'
import { CommonsModule } from '@commons/infrastructure/commons.module'

// Import app utilities
import { GqlAuthGuard } from 'authz/authz.guard'
import { config } from '@commons/infrastructure/config'
import { PerrmissionsGuard } from 'authz/permissions.guard'
import { RolesGuard } from 'authz/roles.guard'
import { CustomerAccessGuard } from 'authz/customer-access.guard'
import { TaskModule } from '@task/infrastructure/task.module'
import { CriticActivityModule } from '@critic-activity/infrastructure/critic-activity.module'
import { MultimediaModule } from '@multimedia/infrastructure/multimedia.module'

// Control the guard access depending on the environment
const authGuard = {
  provide: APP_GUARD,
  useClass: GqlAuthGuard,
}

const permissionsGuard = {
  provide: APP_GUARD,
  useClass: PerrmissionsGuard
}

const rolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard
}

const customerAccessGuard = {
  provide: APP_GUARD,
  useClass: CustomerAccessGuard
}

const providerConfig = []
// Add the guard only if the environment is not local with no authentication
if (config.nodeEnv !== 'local') {  
  providerConfig.push(authGuard, permissionsGuard, rolesGuard, customerAccessGuard)
}

@Module({
  imports: [
    CommonsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/infrastructure/schema.gql',
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    CustomerModule,
    AuthzModule,
    TaskModule,
    CriticActivityModule,
    MultimediaModule
  ],
  controllers: [],
  providers: [...providerConfig],
})
export class AppModule {}
