import jwt, { JwtPayload } from 'jsonwebtoken'

export interface JWTpayloadType {
    userid: string,
    role: string
}

export const generateJwtAccessToken = (payload: JWTpayloadType, secret: string, duration: string) => {
    try {
        return jwt.sign(
            payload,
            secret,
            { expiresIn: duration }
        )
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const verifyAccessToken = (token: string, secret: string): JwtPayload | null => {
    try {
        return jwt.verify(token, secret) as JwtPayload
    } catch (err: any) {
        throw new Error(err.message)
    }
}