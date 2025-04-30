import { User } from "user/domain/user"

const mapUserToDomainFromMongo = (data: any): User => {
  return User.reconstitute({
    id: data.id ?? null,
    firstName: data.first_name ?? null,
    lastName: data.last_name ?? null,
    email: data.email_address ?? null,
    customerId: data.customer_id ?? null
  })
}

const mapUserToDomainFromFirestore = (data: any): User => {
  return User.reconstitute({
    id: data.id ?? null,
    firstName: data.firstName ?? null,
    lastName: data.lastName ?? null,
    email: data.email ?? null,
    customerId: data.customerId ?? null
  })
}

const mapUserToMongoDB = (user: User): any => {
  return {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email_address: user.email,
  }
}

const mapUserToFirestoreDB = (user: User): any => {

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }
}

export { mapUserToDomainFromMongo, mapUserToDomainFromFirestore, mapUserToMongoDB, mapUserToFirestoreDB }
