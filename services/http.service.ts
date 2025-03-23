import axios from "axios";

const http = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        // "Content-Type": "application/json",
    }
});

http.interceptors.request.use();


export default http;