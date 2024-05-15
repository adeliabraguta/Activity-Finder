import {createRouter, createWebHistory} from "vue-router";
import { useAuthStore} from "./store/store.ts";

const routes = [
    {path: '/', name: 'MainPage', component: () => import('./components/MainPage.vue')},
    {path: '/activity', name: 'activity', component: () => import('./components/ActivityPage.vue')},
    {path: '/activities', name: 'activities', component: () => import('./components/ActivitiesPage.vue')},
    {path: '/login', name: 'Login', component: () => import('./components/features/LoginPage.vue')},
    {
        path: '/admin-page', name: 'adminPage', component: () => import('./components/features/AdminPage.vue'),
        beforeEnter() {
            const store = useAuthStore()
            if (
                store.role === 'visitor'
            ) {
                return {name: 'MainPage'}
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory('/activityfinder/'),
    routes
})

router.beforeEach(async (to) => {
    const store = useAuthStore()
    if (
        !store.token &&
        to.name !== 'Login'
    ) {
        return {name: 'Login'}
    }
})

export default router
