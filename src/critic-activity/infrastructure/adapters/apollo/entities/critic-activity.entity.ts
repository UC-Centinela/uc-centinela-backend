import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class CriticActivity {
  @Field(() => Int)
  id: number

  @Field(() => String)
  title: string

  @Field(() => Int)
  taskId: number
}
