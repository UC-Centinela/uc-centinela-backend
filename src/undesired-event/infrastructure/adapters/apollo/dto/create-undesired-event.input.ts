import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator'

@InputType()
export class CreateUndesiredEventInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  criticActivityId: number
}
