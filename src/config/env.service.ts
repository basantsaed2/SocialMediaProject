import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
const mood = process.env.MOOD;
const base_url = process.env.BASE_URL;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_EXPIRES_IN_REFRESH = process.env.JWT_EXPIRES_IN_REFRESH;
const JWT_ADMIN_SIGNATURE = process.env.JWT_ADMIN_SIGNATURE;
const JWT_USER_SIGNATURE = process.env.JWT_USER_SIGNATURE;
const JWT_ADMIN_REFRESH_SIGNATURE = process.env.JWT_ADMIN_REFRESH_SIGNATURE;
const JWT_USER_REFRESH_SIGNATURE = process.env.JWT_USER_REFRESH_SIGNATURE;
const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID;
const REDIS_URL = process.env.REDIS_URL;
const APP_PASS = process.env.APP_PASS;
const APP_EMAIL = process.env.APP_EMAIL;
const APP_NAME = process.env.APP_NAME;

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
