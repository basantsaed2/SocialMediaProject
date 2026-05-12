import th from "zod/v4/locales/th.js";
import {
  ApplicationException,
  BadRequestException,
} from "../../common/exceptions/app.exception";
import { generateToken } from "../../common/security/security";
import { comparePassword, hashPassword } from "../../common/utils/hashing";
import { UserModel } from "../../database";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { HydratedDocument, Model } from "mongoose";
import { IUser } from "../../common/interfaces";
import { DatabaseRepository } from "../../database/repository/base.repository";

class AuthService {
  private userModel: Model<IUser>;
  private userRepository: DatabaseRepository<IUser>;

  constructor() {
    this.userModel = UserModel;
    this.userRepository = new DatabaseRepository(this.userModel);
  }

  async signUp(data: SignUpDTO): Promise<IUser> {

    let result : HydratedDocument<IUser> = await this.userRepository.create(data);
    if (result) {
      throw new BadRequestException("User already exists", 400);
    }

    return result;
  }

  async login(data: LoginDTO): Promise<{ user: any , accessToken: string}> {
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
    const { accessToken } = await generateToken(user);
    return { user : { id: user._id.toJSON(), name: user.name, email: user.email, phone: user.phone ?? "" } , accessToken};
  }
}

export default new AuthService();
