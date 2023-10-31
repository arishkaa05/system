import axios from "axios";

export const $host = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})