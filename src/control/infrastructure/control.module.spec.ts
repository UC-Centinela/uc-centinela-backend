import { Test } from '@nestjs/testing'
import { ControlModule } from './control.module'

describe('ControlModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ControlModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
