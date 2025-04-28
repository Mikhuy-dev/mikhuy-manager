import axios from "axios";
import { AuthServicePort } from "../../core/auth/ports/auth-service-port";
import { AuthLoginEntity } from "../../core/auth/entities/authlogin-entity";

export const authApi: AuthServicePort = {
    async login(email, password) {

        console.log("Calling login api with email:", email, "and password:", password);
        const response = await axios.post(`${import.meta.env.API_URL}/login`, {
            email, password
        });
        return response.data as AuthLoginEntity;
    },

    async logout() {

        await axios.post('/api/logout');
    }
};