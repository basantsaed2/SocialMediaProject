import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env.service";
import { BadRequestException } from "../exceptions/app.exception";

export class TokenService {

    constructor() { }

    generateToken = async (user: any): Promise<{ accessToken: string, refreshToken: string }> => {
        let signature = undefined;
        let refreshSignature = undefined;
        let audience = undefined;
        switch (user.role) {
            case "0":
                signature = env.JWT_ADMIN_SIGNATURE;
                refreshSignature = env.JWT_ADMIN_REFRESH_SIGNATURE;
                audience = "Admin";
                break;
            default:
                signature = env.JWT_USER_SIGNATURE;
                refreshSignature = env.JWT_USER_REFRESH_SIGNATURE;
                audience = "User";
        }

        const accessToken = await jwt.sign({ id: user._id }, signature as string, {
            expiresIn: env.JWT_EXPIRES_IN as any,
            audience
        });

        const refreshToken = await jwt.sign({ id: user._id }, refreshSignature as string, {
            expiresIn: env.JWT_EXPIRES_IN_REFRESH as any,
            audience
        });

        return { accessToken, refreshToken };
    }

    decodeToken = async (token: string): Promise<JwtPayload | string> => {
        let decoded = await jwt.decode(token) as jwt.JwtPayload;
        let signature = undefined

        if (!decoded) {
            throw new BadRequestException("Invalid token");
        }

        switch (decoded.aud) {
            case "Admin":
                signature = env.JWT_ADMIN_SIGNATURE;
                break;
            default:
                signature = env.JWT_USER_SIGNATURE;
        }

        const decodedToken = await jwt.verify(token, signature as string);
        return decodedToken;
    }

    decodeRefreshToken = async (token: string): Promise<JwtPayload | string> => {
        let decoded = await jwt.decode(token) as jwt.JwtPayload;
        let refreshSignature = undefined

        if (!decoded) {
            throw new BadRequestException("Invalid token");
        }

        switch (decoded.aud) {
            case "Admin":
                refreshSignature = env.JWT_ADMIN_REFRESH_SIGNATURE;
                break;
            default:
                refreshSignature = env.JWT_USER_REFRESH_SIGNATURE;
        }

        const decodedToken = await jwt.verify(token, refreshSignature);
        return decodedToken;
    }

}