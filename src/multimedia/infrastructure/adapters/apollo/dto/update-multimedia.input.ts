import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateMultimediaInput } from './create-multimedia.input'

@InputType()
export class UpdateMultimediaInput extends PartialType(CreateMultimediaInput) {
  @Field(() => Int) id: number
}
