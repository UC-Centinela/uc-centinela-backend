import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CUSTOMER_ACCESS_KEY } from './customer-access.decorator'
import { Role } from '../user/domain/user'

@Injectable()
export class CustomerAccessGuard implements CanActivate {
  constructor (private readonly reflector: Reflector) {}

  canActivate (context: ExecutionContext): boolean {
    const requiresCustomerAccess = this.reflector.getAllAndOverride<boolean>(CUSTOMER_ACCESS_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiresCustomerAccess) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    const args = ctx.getArgs()

    if (!user || !user.props) {
      return false
    }

    // Si el usuario es SUPERADMIN, permitir acceso sin verificar customerId
    if (user.props.role === Role.SUPERADMIN) {
      return true
    }

    if (!user.props.customerId) {
      return false
    }

    // Verificar si el recurso solicitado pertenece al customerId del usuario
    const resourceCustomerId = this.extractCustomerIdFromArgs(args)
    return resourceCustomerId === user.props.customerId
  }

  private extractCustomerIdFromArgs (args: any): number | null {
    // Implementar la lógica para extraer el customerId del recurso solicitado
    // Esto dependerá de cómo estén estructurados tus argumentos
    if (args.customerId) {
      return args.customerId
    }

    if (args.input && args.input.customerId) {
      return args.input.customerId
    }
    
    if (args.id) {
      // Aquí podrías necesitar buscar el recurso en la base de datos para obtener su customerId
      // Por ahora retornamos null para indicar que no se pudo determinar
      return null
    }

    return null
  }
} 
