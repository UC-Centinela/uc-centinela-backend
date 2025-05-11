import { Test, TestingModule } from '@nestjs/testing'
import { CustomerResolver } from './customer.resolver'
import { CustomerService } from '@customer/application/customer.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('CustomerResolver', () => {
  let resolver: CustomerResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerResolver, CustomerService],
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

    resolver = module.get<CustomerResolver>(CustomerResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
