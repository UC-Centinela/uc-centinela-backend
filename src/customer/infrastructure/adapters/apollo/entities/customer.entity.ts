import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Customer {
  @Field(() => Int, { description: 'customer id' })
  id: number

  @Field(() => String, { description: 'customer name' })
  name: string

  @Field(() => String, { description: 'customer industry' })
  industry: string

  @Field(() => String, { description: 'customer email' })
  email: string

  @Field(() => Date, { description: 'customer created at' })
  createdAt: Date

  @Field(() => Date, { description: 'customer updated at'})
  updatedAt: Date

}
