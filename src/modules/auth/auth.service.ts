import {
  ApplicationException,
  BadRequestException,
} from "../../common/exceptions/app.exception";
import { generateToken } from "../../common/security/security";
import { comparePassword, hashPassword } from "../../common/utils/hashing";
import { UserModel } from "../../database";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "./auth.type";

class AuthService {
  constructor() {}

  async signUp(data: SignUpDTO): Promise<{ user: IUser }> {
    // Simulate user registration logic
    const { name, email, password, phone } = data;
    if (!name || !email || !password || !phone) {
      throw new BadRequestException("All fields are required", 400);
    }
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      throw new BadRequestException("User already exists");
    } else {
      const hashing = await hashPassword(password);
      const newUser = await UserModel.create({
        name,
        email,
        phone,
        password: hashing,
      });

      await newUser.toJSON();
      return {
        user: {
          id: newUser._id.toJSON(),
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone ?? "",
        },
      };
    }
  }

  async login(data: LoginDTO): Promise<{ user: any , accessToken: string}> {
    // Simulate user login logic
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException("Email and password are required", 400);
    }
    const user = await UserModel.findOne({ email });

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
