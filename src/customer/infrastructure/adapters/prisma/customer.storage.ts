import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Customer, Prisma } from '@prisma/client'

@Injectable()
export class CustomerStorage {
  constructor (private prisma: PrismaService) {
  }

  async customer (customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput
    })
  }

  async customers (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
  }

  async createCustomer (data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
      include: {
        users: true
      }
    })
  }

  async updateCustomer (params: {
    where: Prisma.CustomerWhereUniqueInput
    data: Prisma.CustomerUpdateInput
  }): Promise<Customer> {
    const { where, data } = params
    return this.prisma.customer.update({
      data,
      where
    })
  }

  async deleteCustomer (where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this.prisma.customer.delete({
      where
    })
  }
}