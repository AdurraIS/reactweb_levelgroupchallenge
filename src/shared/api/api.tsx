import axios from 'axios';

export function setupAPIClient(){
    const api = axios.create({
        baseURL: "http://localhost:8080/api/v1",
        headers:  { authorization: `Bearer ${localStorage.getItem('token')}`}
    });
    return api;
}
export const api = setupAPIClient();