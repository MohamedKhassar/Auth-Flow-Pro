import axios, { InternalAxiosRequestConfig } from 'axios'
const ApiServer = "http://localhost:8080";
import Cookies from "universal-cookie";
const api = axios.create({
    baseURL: ApiServer,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const cookies = new Cookies()
        const accessToken = cookies.get("token")
        console.log(accessToken)
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api