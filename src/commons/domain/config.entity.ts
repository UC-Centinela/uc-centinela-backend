export type Config = {
  hostnameBackend: string,
  hostnameFrontend: string[],
  portServer: string,
  nodeEnv: string,
  debug: boolean,
  gcpProjectId: string,
  auth: {
    issuerUrl: string,
    audience: string,
    clientId: string,
    clientSecret: string
    managementClientId: string,
    managementClientSecret: string
  },
  roleIds: {
    roleSuperAdmin: string,
    roleAdmin: string,
    roleOperator: string,
    roleGuest: string
  }
}