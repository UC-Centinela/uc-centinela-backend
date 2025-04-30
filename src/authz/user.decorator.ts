import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Role, User } from '@user/domain/user'
import { config } from '@commons/infrastructure/config'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // If the environment is local with no authentication, return a mock Super Admin user
    if (config.nodeEnv === 'local') {
      return User.create({
        firstName: 'Super Admin',
        lastName: 'Mock',
        email: 'admin@mock.com',
        customerId: 0,
        role: Role.SUPERADMIN
      })
    }
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    const userDomain = User.create(user.props)
    return userDomain
  }
)