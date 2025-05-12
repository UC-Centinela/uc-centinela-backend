import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Tool {
  @Field(() => Int) id: number

  @Field(() => Int) criticActivityId: number

  @Field() title: string
}
