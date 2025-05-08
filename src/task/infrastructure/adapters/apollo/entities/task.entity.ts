import { ObjectType, Field, Int } from '@nestjs/graphql'
import { TaskState } from '@task/domain/task'

@ObjectType()
export class Task {
  @Field(() => Int) id: number
  @Field() title: string
  @Field() instruction: string
  @Field({ nullable: true }) comments?: string
  @Field(() => TaskState) state: TaskState
  @Field({ nullable: true }) changeHistory?: string
  @Field({ nullable: true }) assignationDate?: Date
  @Field({ nullable: true }) requiredSendDate?: Date
  @Field(() => Int) creatorUserId: number
  @Field(() => Int, { nullable: true }) revisorUserId?: number
}
