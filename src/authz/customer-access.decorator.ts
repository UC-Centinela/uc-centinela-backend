import { SetMetadata } from '@nestjs/common'

export const CUSTOMER_ACCESS_KEY = 'customerAccess'

export const CustomerAccess = () => SetMetadata(CUSTOMER_ACCESS_KEY, true) 