import { AuthLoginEntity } from "../entities/authlogin-entity";
import { AuthResponseEntity } from "../entities/authresponse-entity";

export interface AuthServicePort {
    login(email: string, password: string): Promise<AuthResponseEntity>;

    logout(): Promise<void>;
}