import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import ArticleById from '../components/article/ArticleById.vue'

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
    },
    {
        name: 'articleByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    },
    {
        name: 'articleById',
        path: '/articles/:id',
        component: ArticleById
    }
]


const router = new Router({
    mode: 'history',
    routes
});

export default router