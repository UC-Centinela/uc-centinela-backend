import { Test } from '@nestjs/testing'
import { TaskModule } from './task.module'

describe('TaskModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
