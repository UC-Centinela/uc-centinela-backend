import { NotFoundException } from "@nestjs/common"
import { IUserStorageAdapter } from "user/domain/interfaces/user.repository"
import { User } from "user/domain/user"

export class FindOneUserUseCase {

  constructor (private readonly userRepository: IUserStorageAdapter) {
  }

  async execute (email: string): Promise<User> {
    const user: User = await this.userRepository.findOne(email)
    if (!user) {
      throw new NotFoundException(`No user with email: ${email} found`)
    }
    return user
  }
}