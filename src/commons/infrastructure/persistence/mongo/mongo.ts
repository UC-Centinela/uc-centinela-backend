
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Inject } from '@nestjs/common'
import { randomUUID } from 'crypto'

export default class Mongo {

  constructor (@Inject('LOGGER') private logger: ILogger) {
    this.logger.setTraceContext('Infrastructure|Adapter')
  }

  private users = [
    
  ]

  async listAll (collection: string): Promise<any[]> {
    // Here you would normally interact with MongoDB
    this.logger.info(
      `[Mongo][listAll] Listing all documents of collection ${collection} in MongoDB`
    )
    if (collection === 'users') {
      return Promise.resolve(this.users)
    }
    return Promise.resolve([])
  }

  async findOne (collection: string, filter: object): Promise<any> {
    // Here you would normally interact with MongoDB
    this.logger.debug(
      `[Mongo][findOne] Finding one document in collection ${collection} with filter ${JSON.stringify(filter)} in MongoDB`
    )
    if (collection === 'users') {
      return Promise.resolve(
        this.users.find((user) =>
          Object.keys(filter).every((key) => user[key] === filter[key])
        )
      )
    }
    return Promise.resolve(null)
  }

  async insertOne (collection: string, document: any): Promise<any> {
    // Here you would normally interact with MongoDB
    this.logger.info(
      `[Mongo][insertOne] Inserting one document in collection ${collection} with document ${JSON.stringify(document)} in MongoDB`
    )

    if (collection === 'users') {
      const newUser = {
        id: document.id || randomUUID(),
        first_name: document.first_name,
        last_name: document.last_name,
        email_address: document.email_address,
        cell_phone: document.cell_phone
      }
      this.users.push(newUser)
      return Promise.resolve(newUser)
    }
    return Promise.resolve(null)
  }

  async removeOne (collection: string, filter: object): Promise<boolean> {
    // Here you would normally interact with MongoDB
    this.logger.info(
      `[Mongo][removeOne] Removing one document in collection ${collection} with filter ${JSON.stringify(filter)} in MongoDB`
    )

    if (collection === 'users') {
      const index = this.users.findIndex((user) =>
        Object.keys(filter).every((key) => user[key] === filter[key])
      )
      if (index > -1) {
        this.users.splice(index, 1)
        return Promise.resolve(true)
      }
    }
    return Promise.resolve(false)
  }

  async updateOne (collection: string, filter: object): Promise<any> {

    this.logger.info(
      `[Mongo][updateOne] Updating one document in collection ${collection} with filter ${JSON.stringify(filter)}`
    )

    if (collection === 'users') {
      const index = this.users.find((user) =>
        Object.keys(filter).every((key) => user[key] === filter[key])
      )
      if (index > -1) {
        // Remove the user from the list
        this.users.splice(index, 1)
        // add new user
        const newUser = this.users.push(filter)
        return Promise.resolve(newUser)
      }
    }
    return Promise.resolve(null)
  }
}
