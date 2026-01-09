import api from './api';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
}

export const authApi = {
    login(payload: LoginPayload) {
        return api.post('/auth/login', payload);
    },

    register(payload: RegisterPayload) {
        return api.post('/auth/register', payload);
    },

    logout() {
        return api.post('/auth/logout');
    },
};
