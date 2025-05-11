import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateUndesiredEventInput } from './create-undesired-event.input'
import { IsInt } from 'class-validator'

@InputType()
export class UpdateUndesiredEventInput extends PartialType(CreateUndesiredEventInput) {
  @Field(() => Int)
  @IsInt()
  id: number
}
