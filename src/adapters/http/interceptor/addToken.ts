import { InternalAxiosRequestConfig } from "axios";
import { AuthResponseEntity } from "../../../core/auth/entities/authresponse-entity";

export function addToken(req: InternalAxiosRequestConfig) {
    const storedUser = sessionStorage.getItem("seller"); 
    const user: AuthResponseEntity | null = storedUser ? JSON.parse(storedUser) : null;
    if (!user || !user.accesstoken) return req;

    req.headers.Authorization = `Bearer ${user.accesstoken}`;
    req.headers["Content-Type"] = "application/json";

    return req;
}
