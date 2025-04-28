import { AuthLoginEntity } from "../entities/authlogin-entity";
import { AuthServicePort } from "../ports/auth-service-port";

export class AuthUseCases {
  constructor(private authService: AuthServicePort) { }

  async executeLogin(email: string, password: string): Promise<AuthLoginEntity> {
    console.log("AuthUseCases: starting login");
  
    if (!email || !password) {
      console.error("AuthUseCases: Email o contraseña vacíos");
      throw new Error("Email o contraseña vacíos");
    }
  
    console.log("AuthUseCases: calling authService.login");
    return this.authService.login(email, password);
  }
  

  
  async executeLogout(): Promise<void> {
    return this.authService.logout();
  }
}
