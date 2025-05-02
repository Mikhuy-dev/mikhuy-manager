
import axios from "axios";
import { AuthServicePort } from "../../core/auth/ports/auth-service-port";



export const authApi: AuthServicePort = {
    async login(email, password) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/loginSeller`, {
          email, password
        });     

        console.log("authApi", response);
        return response.data;
    },
      

    async logout() {

        // await api.post('/api/logout');
    }
};