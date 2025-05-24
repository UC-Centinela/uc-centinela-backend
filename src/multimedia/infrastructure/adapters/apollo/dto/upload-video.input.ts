import { InputType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsString } from 'class-validator'

@InputType()
export class UploadVideoInput {
  @Field(() => Int)
  @IsInt()
  taskId: number

  @Field()
  @IsString()
  filename: string

  @Field()
  @IsString()
  mimetype: string

  @Field()
  @IsString()
  base64: string // video convertido a base64 desde frontend
}
