import { GenderEnum , RoleEnum , ProviderEnum } from "../../common/enums";

export interface IUser {
  name: string;
  email: string;
  phone: string | undefined;
  profilePic?: string | undefined;
  profileCovers?: string[] | undefined;
  password: string;
  gender?: GenderEnum;
  role?: RoleEnum;
  provider?: ProviderEnum;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
