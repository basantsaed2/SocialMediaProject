import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

export const UserModel = mongoose.model('User', userSchema);

