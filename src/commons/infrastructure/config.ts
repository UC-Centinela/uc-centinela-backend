import * as dotenv from 'dotenv'
import { Config } from '../domain/config.entity'
dotenv.config()

export const config: Config = {
  hostnameBackend: process.env.HOSTNAME_FOR_BACKEND || 'http://localhost',
  hostnameFrontend: process.env.HOSTNAME_FOR_FRONTEND as unknown as string[] || ['http://localhost:8080'],
  portServer: process.env.PORT_NUMBER || '80',
  nodeEnv: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG === 'true' || false,
  gcpProjectId: process.env.GCP_PROJECT_ID || 'projects-platform-develop',
  auth: {
    issuerUrl: process.env.AUTH0_DOMAIN || 'https://digital-solutions-non-prod.us.auth0.com',
    audience: process.env.AUTH0_AUDIENCE || 'https://your-bff.enteldigital.io',
    clientId: process.env.AUTH0_CLIENT_ID || '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    managementClientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID || '',
    managementClientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET || ''
  },
  roleIds: {
    roleSuperAdmin: process.env.AUTH0_ROLE_SUPERADMIN || '',
    roleAdmin: process.env.AUTH0_ROLE_ADMIN || '',
    roleOperator: process.env.AUTH0_ROLE_OPERATOR || '',
    roleGuest: process.env.AUTH0_ROLE_GUEST || ''
  }
}