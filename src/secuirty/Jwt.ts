
import jwt from "jsonwebtoken"
import { config } from 'dotenv';
config({path: process.cwd() + "/.env"});
console.log(process.env.JWT_SECRET)


export const generateToken = (payload: any, secret: string = process.env.JWT_SECRET as string): string => {
  return jwt.sign(payload, secret);
}

export const verifyToken = (token: string, secret: string = process.env.JWT_SECRET as string): any => {
  return jwt.verify(token, secret);
}


export const createJWTSecret = (length: number = 10): string => {
    return [...Array(length)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
}
