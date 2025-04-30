import { Role, User } from "../user"

export interface SyncUserDTO {
  idpId: string;
  email: string;
  name: string
}

export interface UpdateUserDTO {
  email: string;
  updateUser: object
}

export interface CreateUserDTO {
  email: string;
  firstName: string;
  lastName: string;
  customerId: number;
  role?: Role;
}

export interface IUserService {

  create(createUserDTO: CreateUserDTO): Promise<User>;
    
  findAll(customerId?: number): Promise<User[]>;
    
  findOne(email: string): Promise<User>;
    
  update(updateUserDTO: UpdateUserDTO):Promise<User>;
    
  delete(email: string): Promise<boolean>;

  findUsersByCustomer(customerId: number): Promise<User[]>

  syncUser(syncUserDTO: SyncUserDTO): Promise<User>

  assignRole(role: Role, userEmail: string): Promise<User>
}