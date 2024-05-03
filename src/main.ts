import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import MainPage from "./components/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ActivityPage from "./components/ActivityPage.vue";

const pinia = createPinia()
const routes = [
    {path: '/', name: 'MainPage', component: MainPage},
    {path: '/activity', name: 'activity', component: ActivityPage}

]
const router = createRouter({
    history: createWebHistory('/activityfinder/'),
    routes
})

createApp(App).use(router).use(pinia).mount('#app')
