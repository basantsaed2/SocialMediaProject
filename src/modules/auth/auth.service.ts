import { BadRequestException, NotFoundException } from "../../common/exceptions/app.exception";
import { generateHash, verifyHash } from "../../common/security/hashing";
import { UserModel } from "../../database";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { HydratedDocument, Model } from "mongoose";
import { IUser } from "../../common/interfaces";
import { DatabaseRepository } from "../../database/repository/base.repository";
import { sendEmail } from "../../common/utils/email/sendemail";
import { redisService, RedisService } from "../../common/services/redis.services";

class AuthService {
  private userModel: Model<IUser>;
  private userRepository: DatabaseRepository<IUser>;
  private redisService: RedisService;

  constructor() {
    this.userModel = UserModel;
    this.userRepository = new DatabaseRepository(this.userModel);
    this.redisService = redisService;
  }

  async signUp(data: SignUpDTO): Promise<IUser> {

    const { name, email, password, phone } = data;

    if (!name || !email || !password) {
      throw new BadRequestException("Name, email, and password are required", 400);
    }

    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) {
      throw new BadRequestException("User already exists", 400);
    }

    const hashedPassword = await generateHash(password);
    data.password = hashedPassword;

    let result: HydratedDocument<IUser> = await this.userRepository.create(data);
    if (!result) {
      throw new BadRequestException("Failed to create user", 400);
    }

    let code = Math.floor(Math.random() * 100000);
    let hashedCode = await generateHash(String(code))

    await redisService.set({ key: `otp::${result._id}`, value: hashedCode })

    await sendEmail({
      to: email,
      subject: "Welcome to our app!",
      html: `<h1>Welcome, ${name}!</h1><p>Thank you for signing up.</p><p>Your verification code is: ${code}</p>`,
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
    const isMatch = await verifyHash(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Invalid email or password", 401);
    }

    if (!user.isVerified) {
      throw new BadRequestException("user is not verified");
    }

    return user;
  }

  async verifyEmail(email: string, code: string) {
    let user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new BadRequestException("user is not exist");
    }

    if (user.isVerified) {
      throw new BadRequestException("user is already verified");
    }

    let radisCode = await this.redisService.get(`otp::${user._id}`);

    if (!radisCode) {
      throw new NotFoundException("code is not exist or expired");
    }

    const isMatch = await verifyHash(code, radisCode);

    if (!isMatch) {
      throw new NotFoundException("code is not exist");
    } else {
      user = await this.userRepository.findOneAndUpdate(
        { _id: user._id },
        { $set: { isVerified: true } },
        { returnDocument: 'after' }
      )

      await this.redisService.del(`otp::${user?._id}`);
    }
    return user;
  };
}

export default new AuthService();
