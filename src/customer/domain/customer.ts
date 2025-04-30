export class Customer {

  id: number
  
  name: string
  
  industry: string
  
  email: string

  createdAt?: Date

  updatedAt?: Date
  
  constructor (id: number, name: string, industry: string, email: string) {
    this.id = id
    this.name = name
    this.industry = industry
    this.email = email
  }
}