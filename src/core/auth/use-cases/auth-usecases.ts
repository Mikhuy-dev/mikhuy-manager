import { AuthLoginEntity } from "../entities/authlogin-entity";
import { AuthResponseEntity } from "../entities/authresponse-entity";
import { AuthServicePort } from "../ports/auth-service-port";

export class AuthUseCases {
  constructor(private authService: AuthServicePort) { }

  async executeLogin({email, password}: AuthLoginEntity): Promise<AuthResponseEntity> {

    if (!email || !password) {
      console.error("AuthUseCases: Email o contraseña vacíos");
      throw new Error("Email o contraseña vacíos");
    }

    return this.authService.login(email, password);
  }
  

  
  async executeLogout(): Promise<void> {
    return this.authService.logout();
  }
}
