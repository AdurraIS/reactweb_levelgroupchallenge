import axios from 'axios';

export function setupAPIClient() {
    if (localStorage.getItem('token') !== null) {
        return axios.create({
            baseURL: "http://localhost:8080/api/v1",
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    }
    return null;
}