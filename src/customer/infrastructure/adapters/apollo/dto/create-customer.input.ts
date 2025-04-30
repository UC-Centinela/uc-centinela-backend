import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateCustomerInput {
  
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'customer name' })
  name: string
  
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'industry name' })
  industry: string
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'user email' })
  email: string

}
