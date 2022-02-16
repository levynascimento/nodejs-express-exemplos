import { sign, verify } from 'jsonwebtoken'

const AUTH_SECRET = 'secret'

export const generateAcessToken = (data) => sign(data, AUTH_SECRET) 

export const verifyAcessToken = (req, res, next) => {
  try {
    const { autorization } = req.cookies
    if(!autorization) throw new Error( 'autorization_not_found')
    
    const user = verify( autorization, AUTH_SECRET)
    req.user = user
    next()
    
  }catch (err) {
    res.status(401).send()

  }
}