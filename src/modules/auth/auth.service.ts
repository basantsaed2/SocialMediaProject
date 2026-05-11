import {
  ApplicationException,
  BadRequestException,
} from "../../common/exceptions/app.exception";
import { hashPassword } from "../../common/utils/hashing";
import { UserModel } from "../../database";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "./auth.type";

class AuthService {
  constructor() {}

  async signUp(data: SignUpDTO): Promise<{ user: IUser }> {
    try {
      // Simulate user registration logic
      const { name, email, password, phone } = data;
      if (!name || !email || !password || !phone) {
        throw new BadRequestException("All fields are required", 400);
      }
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        throw new BadRequestException("User already exists", 409);
      } else {
        const hashing = await hashPassword(password);
        const newUser = await UserModel.create({
          name,
          email,
          phone,
          password: hashing,
        });

        await newUser.toJSON();
        return { user: { id: newUser._id.toJSON() , name: newUser.name, email: newUser.email, phone: newUser.phone ?? "" } };
      }
    } catch (error) {
      throw new ApplicationException("Sign Up failed", 500, error);
    }
  }

  async login(data: LoginDTO): Promise<LoginDTO> {
    throw new BadRequestException("Login failed", 401);
  }
}

export default new AuthService();
