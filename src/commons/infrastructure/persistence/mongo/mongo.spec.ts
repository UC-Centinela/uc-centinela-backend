import Mongo from './mongo'

describe('Mongo Adapter', () => {
  let mongo: Mongo
  const logger = {
    info: jest.fn(),
    debug: jest.fn(),
    setTraceContext: jest.fn()
  }

  beforeEach(() => {
    mongo = new Mongo(logger as any)
  })

  it('puede insertar y recuperar usuarios', async () => {
    await mongo.insertOne('users', {
      first_name: 'A',
      last_name: 'B',
      email_address: 'a@b.com',
      cell_phone: '123'
    })

    const all = await mongo.listAll('users')
    expect(all.length).toBeGreaterThan(0)
  })

  it('listAll devuelve vacío si colección no es users', async () => {
    const result = await mongo.listAll('otra')
    expect(result).toEqual([])
  })

  it('puede buscar un usuario específico', async () => {
    await mongo.insertOne('users', {
      first_name: 'C',
      last_name: 'D',
      email_address: 'cd@x.com',
      cell_phone: '999'
    })

    const found = await mongo.findOne('users', { email_address: 'cd@x.com' })
    expect(found.email_address).toBe('cd@x.com')
  })

  it('findOne devuelve null si no hay match', async () => {
    const result = await mongo.findOne('users', { email_address: 'none@x.com' })
    expect(result).toBeUndefined()
  })

  it('puede eliminar un usuario', async () => {
    await mongo.insertOne('users', {
      first_name: 'E',
      last_name: 'F',
      email_address: 'e@f.com',
      cell_phone: '000'
    })

    const deleted = await mongo.removeOne('users', { email_address: 'e@f.com' })
    expect(deleted).toBe(true)
  })

  it('removeOne devuelve false si no hay coincidencias', async () => {
    const result = await mongo.removeOne('users', { email_address: 'inexistente@x.com' })
    expect(result).toBe(false)
  })

  it('updateOne devuelve null si no encuentra usuario', async () => {
    const result = await mongo.updateOne('users', { email_address: 'unknown@x.com' })
    expect(result).toBeNull()
  })
})
