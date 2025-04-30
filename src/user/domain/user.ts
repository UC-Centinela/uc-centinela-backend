/**
 * User Domain Model
 *
 * This file defines the User for the domain layer of our application.
 *
 * The User can be defined as a TypeScript as a class with getters and setters.
 *
 */

interface UserProps {
  id?: number;
  idpId?: string;
  role?: Role;
  firstName: string;
  lastName: string;
  email: string;
  customerId: number;
  lastLogin?: Date;
}

export enum Role {
  SUPERADMIN = 'roleSuperAdmin',
  ADMIN = 'roleAdmin',
  OPERATOR = 'roleOperator',
  GUEST = 'roleGuest'
}

export class User {
  private readonly props: UserProps

  private constructor (props: UserProps) {
    this.props = Object.freeze({...props}) // Inmutabilidad
  }

  // Getters
  get id (): number | undefined {
    return this.props.id
  }

  get idpId (): string | undefined {
    return this.props.idpId
  }

  get fullName (): string {
    return `${this.props.firstName} ${this.props.lastName}`
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName
  }

  get email (): string {
    return this.props.email
  }

  get customerId (): number {
    return this.props.customerId
  }

  get lastLogin (): Date | undefined {
    return this.props.lastLogin
  }

  get role (): Role {
    return this.props.role
  }

  // Factory method para crear usuarios
  static create (props: Omit<UserProps, 'id'>): User {
    // Validaciones de dominio
    if (!props.email.includes('@')) {
      throw new Error('Invalid email')
    }

    // Asignar role guest por defecto si no se proporciona
    if (!props.role) {
      props.role = Role.GUEST
    }

    return new User(props)
  }

  // Método para actualizar usuario
  update (props: Partial<UserProps>): User {
    return new User({
      ...this.props,
      ...props
    })
  }

  // Método para reconstruir usuario desde persistencia
  static reconstitute (props: UserProps): User {
    return new User(props)
  }
}
