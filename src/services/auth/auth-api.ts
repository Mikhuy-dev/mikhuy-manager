import axios from "axios";
import { AuthServicePort } from "../../core/auth/ports/auth-service-port";
import { AuthLoginEntity } from "../../core/auth/entities/authlogin-entity";

export const authApi: AuthServicePort = {
    async login(email, password) {
        console.log("authApi: Calling login api with", email, password);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/loginSeller`, {
          email, password
        });
        console.log("authApi: Login response", response.data);
        return response.data as AuthLoginEntity;
    },
      

    async logout() {

        await axios.post('/api/logout');
    }
};