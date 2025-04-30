import { IUserStorageAdapter } from "user/domain/interfaces/user.repository"

export class DeleteUserUseCase {
  constructor (private readonly userRepository: IUserStorageAdapter) {}
    
  async execute (email: string): Promise<boolean> {
    // TODO: Delete user from identity provider
    return await this.userRepository.delete(email)
  }
}