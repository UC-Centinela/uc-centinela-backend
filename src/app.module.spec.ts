import { Test } from '@nestjs/testing'
import { AppModule } from './app.module'

describe('AppModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
