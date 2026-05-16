import bcrypt from 'bcryptjs'
import { env } from '../../config/env.service';

export const generateHash = async (plainText: string): Promise<string> => {
    const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
    return await bcrypt.hash(plainText, salt);
}

export const verifyHash = async (plainText: string, encryptedText: string): Promise<boolean> => {
    return await bcrypt.compare(plainText, encryptedText);
}