import mongoose from "mongoose";
import id from "zod/v4/locales/id.js";
import { GenderEnum , RoleEnum , ProviderEnum } from "../../common/enums";
import { IUser } from "../../common/interfaces";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    profileCovers: {
        type: [String],
    },
    password: {
        type: String,
        required: function(this){
            return this.provider === ProviderEnum.SYSTEM;
        }
    },
    gender: {
        type: String,
        default: GenderEnum.MALE,
        required: true
    },
    role: {
        type: String,
        default: RoleEnum.USER,
        required: true
    },
    provider: {
        type: String,
        default: ProviderEnum.SYSTEM,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret: any){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
}
);

export const UserModel = mongoose.model<IUser>('User', userSchema);

