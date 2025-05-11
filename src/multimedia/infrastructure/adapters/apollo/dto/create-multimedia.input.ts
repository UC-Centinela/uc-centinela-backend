import { InputType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateMultimediaInput {
  @Field(() => Int)
  @IsInt()
  taskId: number

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  photoUrl?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  videoUrl?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  audioTranscription?: string
}
