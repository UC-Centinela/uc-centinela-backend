import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class ControlStrategy {
  @Field(() => Int) id: number
  @Field(() => Int) taskId: number
  @Field() title: string
}
