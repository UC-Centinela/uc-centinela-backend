import { UpdateUserDTO } from "@user/domain/interfaces/user.interface"
import { IUserStorageAdapter } from "@user/domain/interfaces/user.repository"
import { User } from "@user/domain/user"

export class UpdateUserUseCase {
  constructor (private readonly userRepository: IUserStorageAdapter) {}

  async execute (updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(updateUserDTO.email)
    if (!user) {
      throw new Error(`User with email: ${updateUserDTO.email} not found`)

    }
    const newUser = user.update(updateUserDTO.updateUser)
    return await this.userRepository.update(newUser)
  }
}