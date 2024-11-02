import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface JwtPayload {
  username: string;

}
// “Authorization a234asd423wdsr2f2f24232”

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authRequest = req.headers.authorization
  if(authRequest){
    // grabbing the token from the header using split
    const token = authRequest.split(' ')[1];
    const superSecretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, superSecretKey as Secret, (error, user) => {
    if(error){
      return res.sendStatus(403)
    }
    req.user = user as JwtPayload;
    return next()
    })
  }
};
