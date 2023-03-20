import { api, baseUrl } from './api';

export function getUsers() {
    return api.get(`${baseUrl}/users`);
}


