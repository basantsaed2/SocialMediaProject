import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

const mongo_url = process.env.MONGO_URL as string;
const port = process.env.PORT as string;
const mood = process.env.MOOD as string;
const base_url = process.env.BASE_URL as string;
const SALT_ROUNDS = process.env.SALT_ROUNDS as string;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
const JWT_EXPIRES_IN_REFRESH = process.env.JWT_EXPIRES_IN_REFRESH as string;
const JWT_ADMIN_SIGNATURE = process.env.JWT_ADMIN_SIGNATURE as string;
const JWT_USER_SIGNATURE = process.env.JWT_USER_SIGNATURE as string;
const JWT_ADMIN_REFRESH_SIGNATURE = process.env.JWT_ADMIN_REFRESH_SIGNATURE as string;
const JWT_USER_REFRESH_SIGNATURE = process.env.JWT_USER_REFRESH_SIGNATURE as string;
const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID as string;
const REDIS_URL = process.env.REDIS_URL as string;
const APP_PASS = process.env.APP_PASS as string;
const APP_EMAIL = process.env.APP_EMAIL as string;
const APP_NAME = process.env.APP_NAME as string;

export const env = {
  mongo_url,
  port,
  mood,
  base_url,
  SALT_ROUNDS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_EXPIRES_IN_REFRESH,
  JWT_ADMIN_SIGNATURE,
  JWT_USER_SIGNATURE,
  JWT_ADMIN_REFRESH_SIGNATURE,
  JWT_USER_REFRESH_SIGNATURE,
  WEB_CLIENT_ID,
  REDIS_URL,
  APP_PASS,
  APP_EMAIL,
  APP_NAME,
};
