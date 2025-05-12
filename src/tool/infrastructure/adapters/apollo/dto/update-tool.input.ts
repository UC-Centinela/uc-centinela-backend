import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateToolInput } from './create-tool.input'
import { IsInt } from 'class-validator'

@InputType()
export class UpdateToolInput extends PartialType(CreateToolInput) {
  @Field(() => Int)
  @IsInt()
  id: number
}
