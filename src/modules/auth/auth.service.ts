import { ApplicationException } from "../../common/exceptions/app.exception";
import { LoginDTO, SignUpDTO } from "./auth.dto";

class AuthService {
    constructor() { }

    login(data: LoginDTO): LoginDTO {
        throw new ApplicationException("Login failed", 401);
    }

    signUp(data: SignUpDTO): SignUpDTO {
        return data;
    }
}

export default new AuthService();