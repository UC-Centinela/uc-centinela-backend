import { Auth0IdentityProviderService } from './idp.adapter'
import { config } from '@commons/infrastructure/config'
import { Role } from '@user/domain/user'

jest.mock('@commons/infrastructure/config', () => ({
  config: {
    auth: {
      issuerUrl: 'https://issuer.com',
      clientId: 'client-id',
      clientSecret: 'client-secret',
      managementClientId: 'mgmt-id',
      managementClientSecret: 'mgmt-secret'
    },
    roleIds: {
      roleAdmin: 'admin-id',
      roleSuperAdmin: 'super-id',
      roleOperator: 'op-id',
      roleGuest: 'guest-id'
    }
  }
}))

describe('Auth0IdentityProviderService', () => {
  const logger = {
    error: jest.fn(),
    debug: jest.fn(),
    setTraceContext: jest.fn()
  }

  const mockClient = {
    post: jest.fn(),
    get: jest.fn()
  }

  let service: Auth0IdentityProviderService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new Auth0IdentityProviderService(logger as any, mockClient as any)
  })

  it('authentica correctamente y guarda token', async () => {
    mockClient.post.mockResolvedValueOnce({ status: 200, data: { access_token: 'tok123' } })
    const token = await service['authentificate']()
    expect(token).toBe('tok123')
    expect(logger.debug).toHaveBeenCalledWith(expect.stringContaining('Token'))
  })

  it('lanza error si authentificate falla', async () => {
    mockClient.post.mockRejectedValueOnce(new Error('falló'))
    await service['authentificate']()
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('[authentificate] Error'))
  })

  it('crea usuario nuevo con éxito (201)', async () => {
    mockClient.post
      .mockResolvedValueOnce({ status: 200, data: { access_token: 't' } }) // auth
      .mockResolvedValueOnce({ status: 201, data: { user_id: 'abc' } })    // create
      .mockResolvedValueOnce({ status: 200, data: {} })                   // changePassword

    const user = await service.createUser({ email: 'a@b.com', name: '', given_name: 'G', family_name: 'F' })
    expect(user.user_id).toBe('abc')
  })

  it('detecta usuario existente (409) y lo busca', async () => {
    mockClient.post
      .mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } }) // auth
      .mockResolvedValueOnce({ status: 409, data: 'user exists' })             // create
    mockClient.get
      .mockResolvedValueOnce({ status: 200, data: [{ user_id: 'xyz' }] })      // getUser

    const user = await service.createUser({ email: 'a@b.com', name: '', given_name: 'G', family_name: 'F' })
    expect(user.user_id).toBe('xyz')
  })

  it('maneja error en createUser sin user_id', async () => {
    mockClient.post
      .mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } }) // auth
      .mockResolvedValueOnce({ status: 201, data: { other: 'ok' } }) // create

    await expect(service.createUser({
      email: 'a@b.com',
      name: 'Name',
      given_name: 'G',
      family_name: 'F'
    })).resolves.toBeUndefined()

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('User not created properly'))
  })

  it('maneja error en createUser inesperado', async () => {
    mockClient.post
      .mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } }) // auth
      .mockResolvedValueOnce({ status: 500, data: 'internal error' })

    await service.createUser({
      email: 'a@b.com',
      name: 'Name',
      given_name: 'G',
      family_name: 'F'
    })

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('createUser'))
  })

  it('getUser retorna resultados esperados', async () => {
    mockClient.post.mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } })
    mockClient.get.mockResolvedValueOnce({ status: 200, data: [{ email: 'test@mail.com' }] })

    const res = await service.getUser('test@mail.com')
    expect(res[0].email).toBe('test@mail.com')
  })

  it('maneja error en getUser', async () => {
    mockClient.post.mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } })
    mockClient.get.mockRejectedValueOnce('err')

    await service.getUser('test@mail.com')
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('getUser'))
  })

  it('cambia contraseña con éxito', async () => {
    mockClient.post
      .mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } }) // auth
      .mockResolvedValueOnce({ status: 200, data: {} }) // changePassword

    await service.changePassword('email@mail.com', 'conn')
    expect(logger.error).not.toHaveBeenCalledWith(expect.stringContaining('changePassword'))
  })

  it('maneja error en changePassword', async () => {
    mockClient.post.mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } })
    mockClient.post.mockRejectedValueOnce(new Error('change error'))

    await service.changePassword('email@mail.com', 'conn')
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('changePassword'))
  })

  it('asigna un rol correctamente', async () => {
    mockClient.post
      .mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } }) // auth
      .mockResolvedValueOnce({ status: 200, data: {} }) // assign

    await service.assignRole('abc', Role.ADMIN)
    expect(mockClient.post).toHaveBeenCalledWith(
      `/api/v2/roles/admin-id/users`,
      'token',
      { users: ['abc'] },
      { 'Content-Type': 'application/json' }
    )
  })

  it('maneja error en assignRole', async () => {
    mockClient.post.mockResolvedValueOnce({ status: 200, data: { access_token: 'token' } })
    mockClient.post.mockRejectedValueOnce(new Error('role error'))

    await service.assignRole('idp123', Role.ADMIN)
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('assignRole'))
  })
})
