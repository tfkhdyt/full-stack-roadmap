import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import 'dotenv/config'

const API_SECRET = process.env.API_SECRET

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // to verify jwt
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: API_SECRET,
    })
  }

  // returns payload to req.user
  async validate(payload: object) {
    return payload
  }
}
