import { Role } from "@user/domain/user"

export interface CreateIdpUserDTO {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
}

export interface UpdateIdpUserDTO {
  email: string;
  firstName: string;
  lastName: string
}

export interface IdpUser {
  idpId: string;
  email: string;
  firstName: string;
  lastName: string
}

export interface IdpUserBody {
  email: string;
  phone_number: string;
  user_metadata: object;
  blocked: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  app_metadata: object;
  given_name: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
  user_id: string;
  connection: string;
  password: string;
  verify_email: boolean;
  username: string;
}

export interface IdpChangePasswordBody {
  client_id: string;
  email: string;
  connection: string;
}

export interface IIdentityProviderService {
  createUser(dto: CreateIdpUserDTO): Promise<IdpUserBody>;
  getUser(email: string): Promise<IdpUserBody[]>;
  changePassword(email: string, connection: string): Promise<void>;
  assignRole(idpId: string, role: Role): Promise<void>;
}