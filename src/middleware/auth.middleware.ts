import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../common/exceptions/app.exception";
import { TokenService } from "../common/services/token.services";
import { redisService } from "../common/services/redis.services";
import { JwtPayload } from "jsonwebtoken";


const tokenService = new TokenService();

declare global {
    namespace Express {
        interface Request {
            userId: string;
            token: string;
            decodedToken: JwtPayload;
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    let { authorization } = req.headers;

    if (!authorization) {
        return new UnauthorizedException("unauthorized");
    }

    let [flag, token] = authorization?.split(" ");

    if (!token || !flag) {
        return new UnauthorizedException("unauthorized");
    }

    switch (flag) {
        case "Basic":
            const basicData = Buffer.from(token, 'base64').toString();
            let [email, password] = basicData.split(":");
            if (!email || !password) {
                return new UnauthorizedException("Invalid token");
            }
            break;

        case "Bearer":
            let data = await tokenService.decodeToken(token) as JwtPayload;
            let revokedToken = await redisService.get(redisService.createRevokeKey({ id: data?.id, token }))
            if (revokedToken) {
                throw new UnauthorizedException("token is revoked");
            }
            req.userId = data?.id as string;
            req.token = token;
            req.decodedToken = data;
            next();
            break;
        default:
            break;
    }
}