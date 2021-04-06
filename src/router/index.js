import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import ArticleById from '../components/article/ArticleById.vue'
import Auth from '../components/Auth/Auth.vue'
import { userKey } from '../global'

const routes =  [
    {   
        name: 'home',
        path: '/', 
        component: Home
    },
    {
        name: 'adminPages',
        path: '/adminPages',
        component: AdminPages,
        meta: {
            requiresAdmin: true
        }
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
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]


const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin) ) {
        // const user = JSON.stringify(json)
         const user1 = JSON.parse(json)

        user1 && user1.user.roles === 'Administrador' ? next() : next({path: '/'})

    } else {
        next()
    }

})

export default router