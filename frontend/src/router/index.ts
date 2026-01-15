import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "../stores/useAuthStore";
import InterviewsPage from "../pages/InterviewsPage.vue";
import AuthPage from "../pages/AuthPage.vue";

const routes = [
    { path: '/', redirect: '/interviews' },
    { path: '/auth', component: AuthPage,  meta: { hideHeader: true }   },
    { path: '/interviews', component: InterviewsPage, name: 'interviews', meta: { requiresAuth: true } },
    {
        path: '/interviews/:id',
        component: () => import('../layouts/InterviewLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                redirect: 'theory'
            },
            {
                path: 'theory',
                component: () => import('../pages/InterviewTheoryPage.vue'),
                meta: { showBackToInterviews: true },
            },
            {
                path: 'livecoding',
                component: () => import('../pages/InterviewLiveCodingPage.vue'),
                meta: { showBackToInterviews: true },
            }
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

let authInitPromise: Promise<void> | null = null;

router.beforeEach(async (to, _from, next) => {
    const auth = useAuthStore();

    if (!authInitPromise) {
        authInitPromise = auth.fetchCurrentUser().catch(() => {});
    }
    await authInitPromise;

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/auth');
    } else if (to.meta.guestOnly && auth.isAuthenticated) {
        next('/interviews');
    } else {
        next();
    }
});

export default router;
