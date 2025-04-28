import { AuthLoginEntity } from "../entities/authlogin-entity";
import { AuthServicePort } from "../ports/auth-service-port";

export class AuthUseCases {
    constructor(private authService: AuthServicePort) {}
  
    async executeLogin(email: string, password: string): Promise<AuthLoginEntity> {

        if(!email || !password) console.log("Email o contraseña vacíos");

      return this.authService.login(email, password);
    }
  
    async executeLogout(): Promise<void> {
      return this.authService.logout();
    }
  }
  