import { InputType, Field, PartialType, Int } from '@nestjs/graphql'
import { CreateCriticActivityInput } from './create-critic-activity.input'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateCriticActivityInput extends PartialType(CreateCriticActivityInput) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number
}
