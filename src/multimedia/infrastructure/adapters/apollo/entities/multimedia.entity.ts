import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Multimedia {
  @Field(() => Int) id: number
  @Field(() => Int) taskId: number
  @Field({ nullable: true }) photoUrl?: string
  @Field({ nullable: true }) videoUrl?: string
  @Field({ nullable: true }) audioTranscription?: string
}
