import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IVerificationQuestionService } from '@verification-question/domain/interfaces/verification-question.interface'
import { VerificationQuestion } from '../entities/verification-question.entity'
import { CreateVerificationQuestionInput } from '../dto/create-verification-question.input'
import { UpdateVerificationQuestionInput } from '../dto/update-verification-question.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => VerificationQuestion)
export class VerificationQuestionResolver {
  constructor (
    @Inject('IVerificationQuestionService') private readonly service: IVerificationQuestionService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('VerificationQuestionResolver')
  }

  @Permissions('create:verification-question')
  @Mutation(() => VerificationQuestion)
  createVerificationQuestion(@Args('input') input: CreateVerificationQuestionInput) {
    this.logger.debug('[createVerificationQuestion] Creating...')
    return this.service.create(input)
  }

  @Query(() => [VerificationQuestion])
  findAllVerificationQuestions() {
    this.logger.debug('[findAll] Fetching all...')
    return this.service.findAll()
  }

  @Query(() => VerificationQuestion)
  findVerificationQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id)
  }

  @Query(() => [VerificationQuestion])
  findVerificationQuestionsByCriticActivity(@Args('criticActivityId', { type: () => Int }) id: number) {
    return this.service.findAllByCriticActivityId(id)
  }

  @Mutation(() => VerificationQuestion)
  updateVerificationQuestion(@Args('input') input: UpdateVerificationQuestionInput) {
    return this.service.update({ id: input.id, updateVerificationQuestion: input })
  }

  @Mutation(() => Boolean)
  deleteVerificationQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id)
  }
}
