
import jwt from "jsonwebtoken"


export const generateToken = (payload: any, secret: string = process.env.JWT_SECRET as string, expireAt: string = "1d"): string => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
}

export const verifyToken = (token: string, secret: string = process.env.JWT_SECRET as string): any => {
  return jwt.verify(token, secret);
}


export const createJWTSecret = (length: number = 10): string => {
    return [...Array(length)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
}
