import createHttpError from 'http-errors'
import { verifyAccessToken } from './tools.js'

export const JWTAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return createHttpError(401, 'No credentials added')
  } else {
    try {
      const token = req.headers.authorization.replace('Bearer ', '')
      const payload = verifyAccessToken(token)

      req.author = {
        _id: payload._id,
        role: payload.role
      }

      next()
    } catch (error) {
      console.log(error)
      next(createHttpError(401, 'Token not valid'))
    }
  }
}
