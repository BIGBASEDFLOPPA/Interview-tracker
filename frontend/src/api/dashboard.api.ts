import api from './api'

export interface InterviewSummary {
    total: number
    byStatus: { status: string; _count: number }[]
    last: {
        id: number
        title: string
        company: string
        date: string
        status: string
    }[]
}

export interface TheorySummary {
    total: number
    learned: number
    notLearned: number
}

export interface LiveCodingSummary {
    totalTasks: number
    solved: number
    progressPercent: number
}

export interface DashboardData {
    interviews: InterviewSummary
    theory: TheorySummary
    liveCoding: LiveCodingSummary
}

export const dashboardApi = {
    getDashboard: async (): Promise<DashboardData> => {
        const { data } = await api.get('/api/dashboard')
        return data
    }
}
