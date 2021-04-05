<template>
	<div class="artcle-admin">
		<b-container fluid>
			<b-form>
				<input type="hidden" id="user-id" v-model="article.articlesId" />
				<b-row>
					<b-col xs="12">
						<b-form-group
							id="input-group-name"
							label="Nome"
							label-for="input-name"
						>
							<b-form-input
								id="input-name"
								v-model="article.name"
								type="text"
								placeholder="Informe nome do artigo..."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col xs="12">
						<b-form-group
							id="input-group-description"
							label="Descrição"
							label-for="input-description"
						>
							<b-form-input
								id="input-description"
								v-model="article.description"
								type="text"
								placeholder="Informe descrição do artigo..."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col xs="12">
						<b-form-group
							id="input-group-img"
							label="Url Image"
							label-for="input-img"
						>
							<b-form-input
								id="input-name"
								v-model="article.imgUrl"
								type="text"
								placeholder="Url da imagem."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col xs="12">
						<b-form-group
							id="input-group-select"
							label="Categoria"
							label-for="input-select"
						>
							<b-form-select
								id="input-select"
								:options="categories"
								v-model="article.categoriesId"
							>
							</b-form-select>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col xs="12">
						<b-form-group
							id="input-group-select"
							label="Autor"
							label-for="input-select"
						>
							<b-form-select
								id="input-select"
								:options="users"
								v-model="article.userId"
							>
							</b-form-select>
						</b-form-group>
					</b-col> 
				</b-row>

				<b-row class="mt-2 mb-4">
					<b-col xs="12">
						<!-- <b-form-textarea
							id="textarea-default"
							placeholder="Informe o seu conteudo aqui..."
							rows="8"
							v-model="article.content"
						></b-form-textarea> -->

            <b-form-group v-if="mode === 'save'" label="Conteúdo">
              <VueEditor v-model="article.content"
              :readonly="mode === 'remove'" placeholder="Informe o seu conteudo aqui...">
              </VueEditor>

            </b-form-group>
					</b-col>
				</b-row>

				<b-row class="container">
					<b-button variant="primary" v-if="mode === 'save'" @click="save"
						>Salvar</b-button
					>

					<b-button variant="danger" v-if="mode === 'remove'" @click="remove()"
						>Excluir</b-button
					>

					<b-button variant="second" class="ml-2" @click="cancelar"
						>Cancelar</b-button
					>
				</b-row>
			</b-form>
			<hr />
		</b-container>
		<hr />
		<!-- Tabela de usuários -->
		<b-table
			striped
			hover
			:fields="fields"
			:items="articles"
			align-item="center"
		>
			<template slot="actions" slot-scope="data">
				<b-button variant="warning" @click="loadArticle(data.item)" class="m-1">
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button
					variant="danger"
					@click="loadArticle(data.item, 'remove')"
					class="m-1"
				>
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
     <div class="mt-3">
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="limit"
        size="md"
      ></b-pagination>
	</div>
  </div>
</template>

<script>
import { baseUrl, showError } from "../../global";
import axios from "axios";
import { VueEditor } from "vue2-editor";

export default {
	name: "ArtcleAdmin",
  components: {VueEditor},
	data: function () {
		return {
			mode: "save",
			selected: null,
			article: {},
			articles: [],
			categories: [],
			users: [],
			page: 1,
			limit: 5,
			count: 0,
			fields: [
				{ key: "articlesId", label: "Código", sortable: true },
				{ key: "name", label: "Artigo", sortable: true },
				{ key: "description", label: "Descrição", sortable: true },
				{ key: "actions", label: "Ações" },
			],
		};
	},

	methods: {
		reset() {
			this.article = {};
			this.mode = "save";
			this.loadArticles();
		},

		loadArticles() {
			const url = `${baseUrl}/articles/paginator?pageNumber=${this.page}`;
			axios
				.get(url)
				.then((resp) => {
					this.articles = resp.data.map((data) => {
						return { ...data, value: data.articlesId, text: data.name };
					});
				})
				.catch(showError);
		},

    loadCategories() {
			const url = `${baseUrl}/categories`;
			axios
				.get(url)
				.then((resp) => {
					this.categories = resp.data.map((data) => {
						return { ...data, value: data.categoriesId, text: data.name };
					});
				})
				.catch(showError);
		},

    loadUsers() {
			const url = `${baseUrl}/users`;
			axios
				.get(url)
				.then((resp) => {
					this.users = resp.data.map((data) => {
						return { ...data, value: data.userId, text: `${data.name} - ${data.email}` };
					}); 
        })
				.catch(showError);
		},

		save() {
			const method = this.mode === "save" ? "post" : "put";

			if (this.existsParent()) {
				this.article.parentId = this.selected;
			}
			axios[method](`${baseUrl}/articles`, this.article)
				.then(() => {
					this.reset();
					this.$toasted.global.defaultSuccess();
				})
				.then(showError);
		},

		remove() {
			const id = this.article.articlesId;

			axios
				.delete(`${baseUrl}/articles/${id}`)
				.then(() => {
					this.reset();
					this.$toasted.global.defaultSuccess();
				})
				.catch(showError);
		},

		cancelar() {
			this.mode = "save";
			this.article = {};
		},

		loadArticle(article, mode = "save") {
			this.mode = mode;
			this.article = { ...article };
		},

		existsParent() {
			return this.selected ? true : false;
		},
	},

  watch: {
    page() {
      this.loadArticles()
    }
  },


	mounted() {
		this.loadCategories();
    this.loadUsers()
    this.loadArticles()
	},
};
</script>

<style>
</style>