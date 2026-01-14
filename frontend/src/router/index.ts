import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "../stores/useAuthStore";
import LoginPage from "../pages/LoginPage.vue";
import InterviewsPage from "../pages/InterviewsPage.vue";
import InterviewDetailsPage from "../pages/InterviewDetailsPage.vue";

const routes = [
    { path: '/', redirect: '/interviews' },
    { path: '/login', component: LoginPage, meta: { guestOnly: true } },
    { path: '/interviews', component: InterviewsPage, meta: { requiresAuth: true } },
    { path: '/interviews/:id', component: InterviewDetailsPage, meta: { requiresAuth: true } },
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
        next('/login');
    } else if (to.meta.guestOnly && auth.isAuthenticated) {
        next('/interviews');
    } else {
        next();
    }
});

export default router;
