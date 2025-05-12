import { InputType, Field } from '@nestjs/graphql'
import { TaskState, Task } from '@task/domain/task'

@InputType()
export class CreateTaskInput {
  @Field() title: string

  @Field() instruction: string

  @Field(() => TaskState) state: TaskState

  @Field({ nullable: true }) comments?: string

  @Field({ nullable: true }) changeHistory?: string

  @Field({ nullable: true }) assignationDate?: Date

  @Field({ nullable: true }) requiredSendDate?: Date

  @Field() creatorUserId: number

  @Field({ nullable: true }) revisorUserId?: number

  toDomain (): Task {
    return Task.reconstitute({ ...this })
  }
}
