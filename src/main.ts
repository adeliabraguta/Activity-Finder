import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import MainPage from "./components/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ActivityPage from "./components/ActivityPage.vue";

const pinia = createPinia()
const routes = [
    {path: '/activityfinder/', name: 'MainPage', component: MainPage},
    {path: '/activityfinder/activity', name: 'activity', component: ActivityPage}

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
createApp(App).use(router).use(pinia).mount('#app')
