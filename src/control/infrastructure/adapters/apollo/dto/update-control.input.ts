import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateControlInput } from './create-control.input'
import { IsInt } from 'class-validator'

@InputType()
export class UpdateControlInput extends PartialType(CreateControlInput) {
  @Field(() => Int)
  @IsInt()
  id: number
}
