import th from "zod/v4/locales/th.js";
import {
  ApplicationException,
  BadRequestException,
} from "../../common/exceptions/app.exception";
import { generateToken } from "../../common/security/security";
import { comparePassword, hashPassword } from "../../common/security/hashing";
import { UserModel } from "../../database";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { HydratedDocument, Model } from "mongoose";
import { IUser } from "../../common/interfaces";
import { DatabaseRepository } from "../../database/repository/base.repository";
import { sendEmail } from "../../common/utils/email/sendemail";

class AuthService {
  private userModel: Model<IUser>;
  private userRepository: DatabaseRepository<IUser>;

  constructor() {
    this.userModel = UserModel;
    this.userRepository = new DatabaseRepository(this.userModel);
  }

  async signUp(data: SignUpDTO): Promise<IUser> {

    const { name, email, password, phone} = data;

    if (!name || !email || !password) {
      throw new BadRequestException("Name, email, and password are required", 400);
    }

    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) {
      throw new BadRequestException("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);
    data.password = hashedPassword;

    let result : HydratedDocument<IUser> = await this.userRepository.create(data);
    if (!result) {
      throw new BadRequestException("Failed to create user", 400);
    }

    await sendEmail({
      to: email,
      subject: "Welcome to our app!",
      html: `<h1>Welcome, ${name}!</h1><p>Thank you for signing up.</p>`,
    });
    return result;
  }

  async login(data: LoginDTO): Promise<HydratedDocument<IUser>> {
    // Simulate user login logic
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException("Email and password are required", 400);
    }
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new BadRequestException("Invalid email or password", 401);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Invalid email or password", 401);
    }

    return user;
  }
}

export default new AuthService();
