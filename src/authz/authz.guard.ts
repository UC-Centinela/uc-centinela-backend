import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"
import { safeStringify } from "@commons/infrastructure/logger/logger.utils"
import { IUserService } from "@user/domain/interfaces/user.interface"

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor (
    @Inject('LOGGER') private readonly logger: ILogger,
    @Inject('IUserService') private readonly userService: IUserService
  ) {
    super()
    this.logger.setTraceContext(GqlAuthGuard.name)
  }

  // Can Activate Method for GraphQL Context add user from token
  async canActivate (context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    // Make sure the token is in the header for Passport to process it
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authorization header does not exist')
    }
    // Delegate authentication to Passport to invoke the validate method in JwtStrategy
    const result = await super.canActivate(context)
    // Get the user from the request
    const user = this.getRequest(context).user
    // Sincronizar con userService
    const userSynced = await this.userService.syncUser({
      idpId: user.sub,
      email: user.email,
      name: user.name
    })
    // Extender el usuario con el usuario sincronizado
    const extendedUser = {
      ...user,
      ...userSynced
    }
    this.logger.debug(`[GqlAuthGuard][canActivate] extendedUser: ${safeStringify(extendedUser, 0)}`)
    // Asignar el usuario extendido al request
    request.user = extendedUser

    // Debugear el contexto de la petición (solo si la env DEBUG = true)
    this.logger.debug(`[GqlAuthGuard][canActivate] delegated auth?: ${result}`)
    return result as boolean
  }

  getRequest (context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    return request
  }

  handleRequest (err: any, user: any, info: any, context: any) {
    // Debugear el contexto de la petición (solo si la env DEBUG = true)
    //this.logger.debug(`[GqlAuthGuard][handleRequest] context: ${safeStringify(GqlExecutionContext.create(context), 0)}`)

    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    this.logger.debug(`[GqlAuthGuard][handleRequest] authInfo: ${safeStringify(request.authInfo, 0)}`)

    // Si hay un error en la autenticación, lanzar una excepción (si no hay error, authInfo viene vacio)
    if (request.authInfo) {
      // Debugear el resultado de la autenticación (solo si la env DEBUG = true)
      this.logger.error(`Auth Error: ${JSON.stringify(request.authInfo.message)}`)
      throw err || new UnauthorizedException(request.authInfo.message)
    }

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}