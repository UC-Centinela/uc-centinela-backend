import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
export declare class UsersService {
    private UserRepository;
    constructor(UserRepository: Repository<User>);
    createUser(body: CreateUserDto): Promise<User>;
    findOneUser(id: string): Promise<User>;
    findUsers(): Promise<User[]>;
    updateUser(id: string, updateUserDetailsBody: UpdateUserDto): Promise<User>;
    removeUser(id: string): Promise<User>;
}
