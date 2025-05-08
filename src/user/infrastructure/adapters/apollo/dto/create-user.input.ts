import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Role, User } from '@user/domain/user'
import './role.enum'

@InputType()
export class CreateUserInput {
  
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'user id' })
  id?: number

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'user first name' })
  firstName: string
  
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'user last name' })
  lastName: string
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'user email' })
  email: string

  @IsNotEmpty()
  @Field(() => Number, { description: 'user customer id' })
  customerId: number

  @IsNotEmpty()
  @Field(() => Role, { description: 'user role' })
  role: Role
  
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, description: 'user rut (Chilean ID)' })
  rut?: string

  //ToDomain
  public toDomain (): User {
    return User.reconstitute({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      customerId: this.customerId,
      role: this.role,
      rut: this.rut
    })
  }
}
