import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).useMocker((token) => {
      
      if (token === 'IUserStorageAdapter' ) {
        return { 
          findAll: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          remove: jest.fn()
        }
      }
      if (token === 'AUTH0_IDENTITY_PROVIDER_SERVICE') {
        return {
          createUser: jest.fn(),
          getUser: jest.fn(),
          changePassword: jest.fn(),
          assignRole: jest.fn()
        }
      }
      if (token === 'LOGGER') {
        return {
          log: jest.fn(),
          error: jest.fn(),
          warn: jest.fn(),
          debug: jest.fn(),
          setTraceContext: jest.fn()
        }
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
