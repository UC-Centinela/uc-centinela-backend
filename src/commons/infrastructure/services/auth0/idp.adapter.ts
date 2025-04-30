import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { Inject, Injectable } from "@nestjs/common"
import { IHTTPClientPort } from "@commons/domain/interfaces/http.interface"
import { CreateIdpUserDTO, IdpUserBody, IIdentityProviderService } from "@commons/domain/interfaces/identity-provider.interface"
import { config } from "@commons/infrastructure/config"
import { randomUUID } from "crypto"
import { Role } from "@user/domain/user"

@Injectable()
export class Auth0IdentityProviderService implements IIdentityProviderService {
  private token: string

  constructor (
    @Inject('LOGGER') private readonly logger: ILogger,
    @Inject('AUTH0_MANAGEMENT_CLIENT') private readonly client: IHTTPClientPort,
  ) {
    this.logger.setTraceContext(Auth0IdentityProviderService.name)
  }

  public async authentificate (): Promise<any> {

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const body = {
      'client_id': config.auth.managementClientId,
      'client_secret': config.auth.managementClientSecret,
      'audience': `${config.auth.issuerUrl}/api/v2/`,
      'grant_type': "client_credentials"
    }

    try {
      const { status, data } = await this.client.post('/oauth/token', '', body, headers)
      if (status === 200) {
        this.logger.debug(`[authentificate] Token: ${data.access_token}`)
        this.token = data.access_token
        return data.access_token
      } else {
        this.logger.error(`[authentificate] Error: ${data}`)
        throw new Error(data)
      }
    } catch (error) {
      this.logger.error(`[authentificate] Error: ${error}`)
    }
  
  }

  public async getUser (email: string): Promise<IdpUserBody[]> {
    // Obtain token from auth0
    const token = await this.authentificate()

    // get user
    const url = `api/v2/users-by-email?email=${email}`
    try {
      const { status, data } = await this.client.get(url, token)
      if (status === 200) {
        return data
      } else {
        this.logger.error(`[getUser] Error: ${data}`)
      }
    } catch (error) {
      this.logger.error(`[getUser] Error: ${error}`)
    }
  }

  public async createUser (dto: CreateIdpUserDTO): Promise<IdpUserBody> {
    // Obtain token from auth0
    const token = await this.authentificate()

    // create user
    const url = '/api/v2/users'  

    const body = {
      "email": dto.email,
      "given_name": dto.given_name,
      "family_name": dto.family_name,
      "password": randomUUID(),
      "connection": "Username-Password-Authentication",
      "verify_email": false
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const { status, data } = await this.client.post(url, token, body, headers)
      if (status === 409) {
        this.logger.debug(`[createUser] User already exists: ${JSON.stringify(data, null, 2)}`)
        const user = await this.getUser(dto.email)
        return user[0]
      }
      if (status === 201) {
        this.logger.debug(`[createUser] User created: ${JSON.stringify(data, null, 2)}`)
        if (!data.user_id) {
          this.logger.error(`[createUser] Error: ${data}`)
          throw new Error('User not created properly, user_id is missing')
        }
        // Force change password
        await this.changePassword(dto.email, 'Username-Password-Authentication')
        return data
      } else {
        this.logger.error(`[createUser] Error: ${data}`)
      }
    } catch (error) {
      this.logger.error(`[createUser] Error: ${error}`)
    }
  }

  public async changePassword (email: string, connection: string): Promise<void> {
    // Obtain token from auth0
    const token = await this.authentificate()

    // change password
    const url = `dbconnections/change_password`
    const body = {
      "email": email,
      "connection": connection,
      "client_id": config.auth.clientId
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const { status, data } = await this.client.post(url, token, body, headers)
      if (status === 200) {
        return data
      } else {
        this.logger.error(`[changePassword] Error: ${data}`)
      }
    } catch (error) {
      this.logger.error(`[changePassword] Error: ${error}`)
    }
  }
  
  public async assignRole (idpId: string, role: Role): Promise<void> {
    // Obtain token from auth0
    const token = await this.authentificate()

    // get role id from config
    const roleId = (Object.keys(config.roleIds).includes(role) ? config.roleIds[role] : '') // Default to an empty string if role is not valid

    // asign role to user
    const url = `/api/v2/roles/${roleId}/users`
    const body = {
      "users": [idpId]
    }
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const { status, data } = await this.client.post(url, token, body, headers)
      if (status === 200) {
        return data
      } else {
        this.logger.error(`[assignRole][post] Error: ${data}`)
      }
    } catch (error) {
      this.logger.error(`[assignRole] Error: ${error}`)
    }
  }
}
