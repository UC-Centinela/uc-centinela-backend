import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUserById(id: string, body: UpdateUserDto): Promise<User>;
    deleteUserById(id: string): Promise<User>;
}
