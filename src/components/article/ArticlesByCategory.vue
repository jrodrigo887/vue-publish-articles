<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.articlesId">
               
                <div v-if="article">
                    <ArticleItem :article="article" />
                </div>

                <div v-else class="not-article">
                    <h1>Nenhum artigo encontrado nesta categoria.</h1>
                </div>

            </li>
        </ul>
        <div class="load-more">
            <!-- <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Carregar Mais Artigos</button> -->
        </div>
    </div>
</template>

<script>
import { baseUrl } from '../../global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function() {
        return {
            category: {},
            articles: [],
            articleisEmpty: false,
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles() {
            // const url = `${baseUrl}/categories/${this.category.id}/articles?page=${this.page}`
            const url = `${baseUrl}/categories/${this.category.id}/articles`

            axios(url).then(res => {
                this.articles = this.articles.concat(res.data.articles)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        },
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }

    .no-article {
        display: flex;
        justify-content: center;
        margin-top: 1.1rem;
        font-size: 1.2rem;
        color: rgba(0, 0, 0, .5);
    }
</style>
