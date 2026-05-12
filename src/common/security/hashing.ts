import bcrypt from 'bcryptjs'
import { env } from '../../config/env.service';

export const hashPassword = async (password : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password : string, hashPassword : string) : Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
}