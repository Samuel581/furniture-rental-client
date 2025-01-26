import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if(error.response?.status === 401) {}
        return Promise.reject(error);
    }
)