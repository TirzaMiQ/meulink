import axios from 'axios';

export const key = "c60a76131d7c91bd9e2813e44ddfb5b4bfceeed7"

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4/',
    headers: {
        'Authorization': `Bearer ${key}`
    }
})

export default api;