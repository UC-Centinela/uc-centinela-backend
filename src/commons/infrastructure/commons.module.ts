import { Module, Scope } from "@nestjs/common"
import { WinstonLogger } from "./logger"
import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { config } from "./config"
import { Auth0ManagementClient } from "./services/auth0/http_client"
import { Auth0IdentityProviderService } from "./services/auth0/idp.adapter"
import { IHTTPClientPort } from "@commons/domain/interfaces/http.interface"

@Module({
  providers: [
    {
      provide: 'LOGGER',
      useFactory: () => new WinstonLogger(),
      scope: Scope.TRANSIENT,
    },
    {
      provide: 'AUTH0_MANAGEMENT_CLIENT',
      useFactory: (logger: ILogger) => {
        return new Auth0ManagementClient(
          logger,
          config.auth.issuerUrl,
        )
      },
      inject: ['LOGGER'],
    },
    {
      provide: 'AUTH0_IDENTITY_PROVIDER_SERVICE',
      useFactory: (logger: ILogger, client: IHTTPClientPort) => {
        return new Auth0IdentityProviderService(logger, client)
      },
      inject: ['LOGGER', 'AUTH0_MANAGEMENT_CLIENT'],
    }
  ],
  exports: ['LOGGER', 'AUTH0_IDENTITY_PROVIDER_SERVICE']
})
export class CommonsModule {}