import {createRouter, createWebHistory} from 'vue-router';

import LoginPage from "../pages/LoginPage.vue";
import {useAuthStore} from "../stores/useAuthStore";
import InterviewDetailsPage from "../pages/InterviewDetailsPage.vue";
import InterviewsPage from "../pages/InterviewsPage.vue";

const routes = [
    {
        path: '/',
        redirect: () => {
            const authStore = useAuthStore()
            return authStore.isAuthenticated ? '/dashboard' : '/login'
        }
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/dashboard',
        component: () => import('../pages/DashboardPage.vue')
    },
    {path: '/interviews', component: InterviewsPage},
    {path: '/interviews/:id', component: InterviewDetailsPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
