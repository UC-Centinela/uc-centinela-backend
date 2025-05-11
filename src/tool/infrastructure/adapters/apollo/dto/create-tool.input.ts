import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsInt } from 'class-validator'

@InputType()
export class CreateToolInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  criticActivityId: number
}
