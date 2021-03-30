import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'

const routes =  [
    {   
        name: 'home',
        path: '/', 
        component: Home
    },
    {
        name: 'adminPages',
        path: '/adminPages',
        component: AdminPages
    }
]


const router = new Router({
    mode: 'history',
    routes
});

export default router