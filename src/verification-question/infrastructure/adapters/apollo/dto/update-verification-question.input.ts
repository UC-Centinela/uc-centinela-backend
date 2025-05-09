import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateVerificationQuestionInput } from './create-verification-question.input'
import { IsInt } from 'class-validator'

@InputType()
export class UpdateVerificationQuestionInput extends PartialType(CreateVerificationQuestionInput) {
  @Field(() => Int)
  @IsInt()
  id: number
}
