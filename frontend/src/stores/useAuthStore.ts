import { defineStore } from 'pinia'
import {authApi} from "../api/auth.api";
import api from "../api/api";


export interface CurrentUser {
    id: number
    email: string
    name: string
    createdAt: string
}

interface AuthState {
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    currentUser: CurrentUser | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        isLoading: false,
        error: null,
        currentUser: null,
    }),

    actions: {
        async login(email: string, password: string) {
            this.isLoading = true
            this.error = null

            try {
                await authApi.login({ email, password })
                this.isAuthenticated = true
                await this.fetchCurrentUser()
            } catch (e: any) {
                this.error = e.response?.data?.message || 'Login error'
                this.isAuthenticated = false
            } finally {
                this.isLoading = false
            }
        },

        async register(email: string, password: string, name: string) {
            this.isLoading = true
            this.error = null

            try {
                await authApi.register({ email, password, name })
                this.isAuthenticated = true
                await this.fetchCurrentUser()
            } catch (e: any) {
                this.error = e.response?.data?.message || 'Register error'
                this.isAuthenticated = false
            } finally {
                this.isLoading = false
            }
        },

        async fetchCurrentUser() {
            try {
                const { data } = await api.get('/api/users/current-user')
                this.currentUser = data
                this.isAuthenticated = true
            } catch {
                this.logoutLocal()
            }
        },

        async logout() {
            this.isLoading = true
            try {
                await authApi.logout()
            } finally {
                this.logoutLocal()
                this.isLoading = false
            }
        },

        logoutLocal() {
            this.isAuthenticated = false
            this.currentUser = null
            this.error = null
        },
    },
})
