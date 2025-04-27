import { AuthLoginEntity } from "../../core/auth/entities/authlogin-entity";

export interface AuthServicePort {
    login(email: string, password: string): Promise<AuthLoginEntity>;

    logout(): Promise<void>;
}