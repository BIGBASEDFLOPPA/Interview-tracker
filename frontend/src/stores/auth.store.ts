import { defineStore } from 'pinia';
import {authApi} from "../api/auth.api";


interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        isLoading: false,
        error: null,
    }),

    actions: {
        async login(email: string, password: string) {
            this.isLoading = true;
            this.error = null;

            try {
                await authApi.login({ email, password });
                this.isAuthenticated = true;
            } catch (e: any) {
                this.error = e.response?.data?.message || 'Login error';
            } finally {
                this.isLoading = false;
            }
        },

        async register(email: string, password: string, name: string) {
            this.isLoading = true;
            this.error = null;

            try {
                await authApi.register({ email, password, name });
                this.isAuthenticated = true;
            } catch (e: any) {
                this.error = e.response?.data?.message || 'Register error';
            } finally {
                this.isLoading = false;
            }
        },

        async logout() {
            this.isLoading = true;
            try {
                await authApi.logout();
                this.isAuthenticated = false;
            } catch {
            } finally {
                this.isLoading = false;
            }
        },
    },
});
