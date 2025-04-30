import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { PERMISSIONS_KEY } from './permissions.decorator'

@Injectable()
export class PerrmissionsGuard implements CanActivate {
  constructor (private readonly reflector: Reflector) {}

  canActivate (context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    // Suponiendo que en el payload del token vienen los permisos o roles en 'user.permissions'
    return requiredPermissions.some(permission => user.permissions?.includes(permission))
  }
}