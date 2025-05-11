import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateControlStrategyInput } from './create-control-strategy.input'
import { IsInt } from 'class-validator'

@InputType()
export class UpdateControlStrategyInput extends PartialType(CreateControlStrategyInput) {
  @Field(() => Int)
  @IsInt()
  id: number
}
