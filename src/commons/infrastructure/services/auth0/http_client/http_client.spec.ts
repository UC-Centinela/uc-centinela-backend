import Auth0ManagementClient from './http_client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn()
}
;(axios.create as jest.Mock).mockReturnValue(mockedAxios)

describe('Auth0ManagementClient', () => {
  const logger = { info: jest.fn(), error: jest.fn() }
  const baseURL = 'https://auth0.api'

  it('falla si no se entrega baseURL válida', () => {
    expect(() => new Auth0ManagementClient(logger as any, '')).toThrow()
  })

  it('realiza GET exitoso', async () => {
    const client = new Auth0ManagementClient(logger as any, baseURL)
    mockedAxios.get.mockResolvedValue({ status: 200, data: { msg: 'ok' } })

    const result = await client.get('/test', 'token')
    expect(result.status).toBe(200)
  })

  it('realiza POST con error controlado', async () => {
    const client = new Auth0ManagementClient(logger as any, baseURL)
    mockedAxios.post.mockRejectedValue({ response: { status: 400, data: 'fail' } })

    const result = await client.post('/fail', 'token', {}, {})
    expect(result.status).toBe(400)
  })
})
