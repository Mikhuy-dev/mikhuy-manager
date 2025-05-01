
import { AuthServicePort } from "../../core/auth/ports/auth-service-port";
import api from "../axios-intance";

export const authApi: AuthServicePort = {
    async login(email, password) {
        const response = await api.post(`${import.meta.env.VITE_API_URL}/auth/loginSeller`, {
          email, password
        });     
        return response.data;
    },
      

    async logout() {

        await api.post('/api/logout');
    }
};