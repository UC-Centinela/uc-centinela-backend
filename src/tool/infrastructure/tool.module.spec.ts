import { Test } from '@nestjs/testing'
import { ToolModule } from './tool.module'

describe('ToolModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ToolModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
