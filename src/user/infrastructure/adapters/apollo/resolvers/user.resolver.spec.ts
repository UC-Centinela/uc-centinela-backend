import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from '../../../../application/user.service'

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
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
      if (token === 'IUserService') {
        return {
          findAll: jest.fn().mockResolvedValue([]),
          findOne: jest.fn().mockResolvedValue({}),
          create: jest.fn().mockResolvedValue({}),
          update: jest.fn().mockResolvedValue({}),
          remove: jest.fn().mockResolvedValue({})
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

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
