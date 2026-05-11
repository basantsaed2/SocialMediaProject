import jwt from "jsonwebtoken";
import { env } from '../../config/env.service';

export const generateToken = async (user: any) => {
    const accessToken = jwt.sign(
        { id: user._id }, 
        env.JWT_USER_SIGNATURE as string,
        { expiresIn: env.JWT_EXPIRES_IN as any } 
    );
    
    return { accessToken };
}

export const decodeToken = async (token: string) => {
    const decodedToken = jwt.verify(token, env.JWT_USER_SIGNATURE as string);
    return decodedToken;
}