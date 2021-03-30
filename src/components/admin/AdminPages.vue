<template>

    <div class="admin">
        <PageTitle
        icons="fa fa-cogs" 
        main="Administração do Sistema"
        sub="Cadastro & CIA" />

        <b-card no-body>
            <b-tabs card>
                <b-tab title="Artigo">
                    <h1>Artigo</h1>
                    <ArticleAdmin />
                </b-tab>
                 <b-tab title="Categoria">
                     <CategoryAdmin />
                </b-tab>
                 <b-tab title="Usuário">
                     <UserAdmin></UserAdmin>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>

</template>
<script>
import PageTitle from "../template/PageTitle.vue"
import UserAdmin from './UserAdmin.vue'
import CategoryAdmin from './CategoryAdmin.vue'
import ArticleAdmin from './ArticleAdmin.vue'



export default {
    name: 'AdminPages',
	components: { PageTitle, UserAdmin, CategoryAdmin, ArticleAdmin },

}
</script>
<style>

    
</style>