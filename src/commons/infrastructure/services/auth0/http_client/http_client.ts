import { Inject, Injectable } from "@nestjs/common"
import Axios, { AxiosInstance } from "axios"

// application dependencies
import { IHTTPClientPort } from "@commons/domain/interfaces/http.interface"

// Adapters
import { ILogger } from "@commons/domain/interfaces/logger.interface"

export enum HTTPCode {
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  ok = 200,
}

@Injectable()
export default class Auth0ManagementClient implements IHTTPClientPort {

  private axiosInstance: AxiosInstance

  constructor (
    @Inject('LOGGER') private readonly logger: ILogger,
    baseURL: string,
  ) {
    // check if params are valids
    if (baseURL == null || baseURL === "") {
      const error = "baseURL param is not valid"
      this.logger.error(error)
      throw new Error(error)
    }

    this.axiosInstance = Axios.create({
      timeout: 100000,
      baseURL,
    })
  }

  public async get (url: string, token: string): Promise<any> {

    try {
      const { status, data } = await this.axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return { status, data }
    } catch (error) {
      this.logger.error(
        `[Adapter][Auth0][${
          this.constructor.name
        }][get] Error: ${JSON.stringify(error.response.data)}`
      )
      throw error
    }
  }

  public async post (url: string, token: string, body: object, headers: object): Promise<any> {
    try {
      this.logger.info(
        `[Adapter][Auth0][${this.constructor.name}][post] url: ${url}, data: ${JSON.stringify(
          body
        )}`
      )
      const { status, data } = await this.axiosInstance.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...headers,
      })
      return { status, data }
    } catch (error) {
      this.logger.error(
        `[Adapter][Auth0][${
          this.constructor.name
        }][post] Error: ${JSON.stringify(error.response.data)}`
      )
      return { status: error.response.status, data: error.response.data }
    }
  }

  public async patch (url: string, token: string, body: object, headers: object): Promise<any> {
    try {
      this.logger.info(
        `[Adapter][Auth0][${this.constructor.name}][patch] url: ${url}, body: ${JSON.stringify(
          body
        )}`
      )
      const { status, data } = await this.axiosInstance.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...headers,
      })

      return { status, data }
    } catch (error) {
      this.logger.error(
        `[Adapter][Auth0][${
          this.constructor.name
        }][patch] Error: ${JSON.stringify(error.response.data)}`
      )
      throw error
    }
  }
}
