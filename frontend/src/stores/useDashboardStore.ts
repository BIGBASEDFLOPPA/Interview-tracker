import { defineStore } from 'pinia'
import {dashboardApi, DashboardData} from "../api/dashboard.api";


interface DashboardState {
    data: DashboardData | null
    isLoading: boolean
    error: string | null
}

export const useDashboardStore = defineStore('dashboard', {
    state: (): DashboardState => ({
        data: null,
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchDashboard() {
            this.isLoading = true
            this.error = null
            try {
                const data = await dashboardApi.getDashboard()
                this.data = data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Failed to fetch dashboard'
            } finally {
                this.isLoading = false
            }
        }
    }
})
