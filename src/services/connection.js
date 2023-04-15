import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://alex-yudi-api-tdd.cyclic.app',
    timeout: 5000,
    headers: { "Content-Type": 'application/json' }
});