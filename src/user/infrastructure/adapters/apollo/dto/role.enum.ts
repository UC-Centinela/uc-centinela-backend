import { registerEnumType } from '@nestjs/graphql'
import { Role } from '@user/domain/user'

registerEnumType(Role, {
  name: 'Role',
  description: 'User role enum',
}) 