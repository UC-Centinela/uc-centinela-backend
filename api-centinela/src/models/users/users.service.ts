import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    const newUser: User = this.UserRepository.create(body);

    return this.UserRepository.save(newUser);
  }
  async findOneUser(id: string): Promise<User> {
    console.log(id);
    const user: Promise<User> = this.UserRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error(`Usuario con id ${id} no existe`);
    }
    return user;
  }
  async findUsers(): Promise<User[]> {
    try {
      return this.UserRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al listar los usuarios: ' + error.message,
      );
    }
  }

  async updateUser(
    id: string,
    updateUserDetailsBody: UpdateUserDto,
  ): Promise<User> {
    const user: User = await this.findOneUser(id);

    Object.assign(user, updateUserDetailsBody);
    return this.UserRepository.save(user);
  }

  async removeUser(id: string): Promise<User> {
    const removedUser: User = await this.findOneUser(id);
    return this.UserRepository.remove(removedUser);
  }
}
