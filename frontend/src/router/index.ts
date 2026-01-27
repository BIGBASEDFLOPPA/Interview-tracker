import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from "../pages/AuthPage.vue";
import InterviewsPage from "../pages/InterviewsPage.vue";
import AppLayout from "../layouts/AppLayout.vue";
import { useAuthStore } from "../stores/useAuthStore";

const routes = [
    { path: '/', redirect: '/interviews' },

    // Авторизация без layout
    { path: '/auth', component: AuthPage, meta: { hideHeader: true } },

    // Все защищённые страницы через AppLayout
    {
        path: '/',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            { path: 'interviews', component: InterviewsPage, name: 'interviews' },
            {
                path: 'interviews/:id',
                children: [
                    { path: '', redirect: 'theory' },
                    {
                        path: 'theory',
                        component: () => import('../pages/InterviewTheoryPage.vue'),
                        meta: { showBackToInterviews: true },
                    },
                    {
                        path: 'livecoding',
                        component: () => import('../pages/InterviewCodingPage.vue'),
                        meta: { showBackToInterviews: true },
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Проверка авторизации
let authInitPromise: Promise<void> | null = null;
router.beforeEach(async (to, _from, next) => {
    const auth = useAuthStore();
    if (!authInitPromise) authInitPromise = auth.fetchCurrentUser().catch(() => {});
    await authInitPromise;

    if (to.meta.requiresAuth && !auth.isAuthenticated) next('/auth');
    else if (to.meta.guestOnly && auth.isAuthenticated) next('/interviews');
    else next();
});

export default router;
