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
