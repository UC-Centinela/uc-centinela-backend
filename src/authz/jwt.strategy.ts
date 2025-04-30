import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { passportJwtSecret } from 'jwks-rsa'
import { config } from '../commons/infrastructure/config'
import { ILogger } from '@commons/domain/interfaces/logger.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: false,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.auth.issuerUrl}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.auth.audience,
      issuer: `${config.auth.issuerUrl}/`,
      algorithms: ['RS256'],
      passReqToCallback: true
    })
    this.logger.setTraceContext(JwtStrategy.name)
  }

  async validate (req: Request, payload: any): Promise<any> {
    // If we get to this point, the token has a valid signature
    this.logger.debug(`Payload user: ${JSON.stringify(payload, null, 2)}`)
    // Implicit expiration validation can be done by passport,
    // but can be confirmed:
    if (payload.exp * 1000 < Date.now()) {
      this.logger.error('Expired Token')
      throw new UnauthorizedException('Expired Token')
    }
  
    // Validate that the audience is the expected one
    if (payload.aud.indexOf(config.auth.audience)) {
      this.logger.error('Invalid audience in token')
      throw new UnauthorizedException('Invalid audience in token')
    }
    
    // If everything is correct, return the payload to be assigned to request.user
    return payload
  }
}