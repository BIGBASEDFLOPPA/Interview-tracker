import { createRouter, createWebHistory } from 'vue-router';
import {useAuthStore} from "../stores/auth.store";
import LoginPage from "../pages/LoginPage.vue";


const routes = [
    { path: '/login', component: LoginPage },
    // { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
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
