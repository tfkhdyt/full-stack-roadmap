import { VerifyJwtMiddleware } from './verify-jwt.middleware'

describe('VerifyJwtMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyJwtMiddleware()).toBeDefined()
  })
})
