import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => String, { description: 'user id' })
  id: number

  @Field(() => String, { description: 'user first name' })
  firstName: string

  @Field(() => String, { description: 'user last name' })
  lastName: string

  @Field(() => String, { description: 'user email' })
  email: string

  @Field(() => String, { description: 'user customer id' })
  customerId: number

  @Field(() => String, { description: 'user role' })
  role: string

  @Field(() => String, { description: 'user idp id' })
  idpId: string
  
  @Field(() => String, { nullable: true, description: 'user rut (Chilean ID)' })
  rut?: string
}
