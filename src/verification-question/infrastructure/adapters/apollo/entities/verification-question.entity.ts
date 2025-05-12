import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class VerificationQuestion {
  @Field(() => Int) id: number

  @Field(() => Int) criticActivityId: number

  @Field() title: string

  @Field({ nullable: true }) description?: string
}
