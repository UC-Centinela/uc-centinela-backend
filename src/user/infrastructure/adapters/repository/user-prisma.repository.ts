import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { Role, User } from '@user/domain/user'
import { UserStorage } from "../prisma/user.storage"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserStorageAdapter implements IUserStorageAdapter {
    
  constructor ( 
    private readonly userStorage: UserStorage,
  ) {}

  async findOne (email: string): Promise<User> {
    const user = await this.userStorage.user({ email })
    if (!user) return null
    return User.reconstitute({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      customerId: user.customerId,
      idpId: user.idpId,
      role: user.role as Role,
      rut: user.rut,
    })
  }

  async findOneByIdpId (idpId: string): Promise<User> {
    const users = await this.userStorage.users({
      where: { idpId },
      take: 1
    })
    
    if (!users.length) return null
    
    const user = users[0]
    return User.reconstitute({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      customerId: user.customerId,
      idpId: user.idpId,
      role: user.role as Role,
      rut: user.rut,
    })
  }

  async findAll (customerId?: number): Promise<User[]> {
    if (customerId) {
      const users = await this.userStorage.users({ where: { customerId } })
      return users.map(user => User.reconstitute({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        customerId: user.customerId,
        idpId: user.idpId,
        role: user.role as Role,
        rut: user.rut,
      }))
    } else {
      const users = await this.userStorage.users({})
      return users.map(user => User.reconstitute({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        customerId: user.customerId,
        idpId: user.idpId,
        role: user.role as Role,
        rut: user.rut,
      }))
    }
  }

  async create (user: User): Promise<User> {
    const createdUser = await this.userStorage.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      customer: { connect: { id: user.customerId } },
      idpId: user.idpId,
      role: user.role,
      rut: user.rut,
    })
    return User.reconstitute({
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      customerId: createdUser.customerId,
      idpId: createdUser.idpId,
      role: createdUser.role as Role,
      rut: createdUser.rut,
    })
  }

  async update (user: User): Promise<User> {
    const updatedUser = await this.userStorage.updateUser({
      where: { email: user.email },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        customer: { connect: { id: user.customerId } },
        idpId: user.idpId,
        role: user.role,
        rut: user.rut,
      }
    })
    return User.reconstitute({
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      customerId: updatedUser.customerId,
      idpId: updatedUser.idpId,
      role: updatedUser.role as Role,
      rut: updatedUser.rut,
    })
  }

  async delete (email: string): Promise<boolean> {
    const deletedUser = await this.userStorage.deleteUser({ email })
    if (!deletedUser) return false
    return true
  }

  async findUsersByCustomer (customerId: number): Promise<User[]> {
    const users = await this.userStorage.users({ where: { customerId } })
    return users.map(user => User.reconstitute({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      customerId: user.customerId,
      idpId: user.idpId,
      role: user.role as Role,
      rut: user.rut,
    }))
  }
}