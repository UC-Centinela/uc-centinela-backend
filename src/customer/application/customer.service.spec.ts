import { Test, TestingModule } from '@nestjs/testing'
import { CustomerService } from './customer.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('CustomerService', () => {
  let service: CustomerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).useMocker((token) => {
      
      if (token === 'ICustomerStorageAdapter' ) {
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
          remove: jest.fn().mockResolvedValue({}),
          findUsersByCustomer: jest.fn().mockResolvedValue([]),
          syncUser: jest.fn().mockResolvedValue({}),
          assignRole: jest.fn().mockResolvedValue({})
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

    service = module.get<CustomerService>(CustomerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
