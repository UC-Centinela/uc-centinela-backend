import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import { UserModule } from './user/infrastructure/user.module'
import { CustomerModule } from '@customer/infrastructure/customer.module'
import { AuthzModule } from 'authz/authz.module'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { GqlAuthGuard } from 'authz/authz.guard'
import { config } from '@commons/infrastructure/config'
import { PerrmissionsGuard } from 'authz/permissions.guard'
import { RolesGuard } from 'authz/roles.guard'
import { CustomerAccessGuard } from 'authz/customer-access.guard'
import { TaskModule } from '@task/infrastructure/task.module'
import { CriticActivityModule } from '@critic-activity/infrastructure/critic-activity.module'
import { MultimediaModule } from '@multimedia/infrastructure/multimedia.module'
import { ControlStrategyModule } from '@control-strategy/infrastructure/control-strategy.module'
import { ControlModule } from '@control/infrastructure/control.module'
import { UndesiredEventModule } from '@undesired-event/infrastructure/undesired-event.module'
import { VerificationQuestionModule } from '@verification-question/infrastructure/verification-question.module'
import { ToolModule } from '@tool/infrastructure/tool.module'

// Guards según ambiente
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
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    CustomerModule,
    AuthzModule,
    TaskModule,
    CriticActivityModule,
    MultimediaModule,
    ControlStrategyModule,
    ControlModule,
    UndesiredEventModule,
    VerificationQuestionModule,
    ToolModule
  ],
  controllers: [],
  providers: [...providerConfig],
})
export class AppModule {}
