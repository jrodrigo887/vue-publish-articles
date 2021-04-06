<template>
	<div class="category-admin">
		<b-container fluid>
			<b-form>
				<input type="hidden" id="user-id" v-model="category.categoriesId" />
				<b-row>
					<b-col xs="12">
						<b-form-group
							id="input-group-name"
							label="Categoria"
							label-for="input-name"
						>
							<b-form-input
								id="input-name"
								v-model="category.name"
								type="text"
								placeholder="Informe nome da categoria."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<!-- <b-col xs="12">
						<b-form-group
							id="input-group-select"
							label="Categoria Pai"
							label-for="input-select"
						>
							<b-form-select
								id="input-select"
								:options="categories"
								v-model="selected"
							>
							</b-form-select>
						</b-form-group>
					</b-col> -->
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
			:items="categories"
			align-item="center"
		>
			<template slot="actions" slot-scope="data">
				<b-button
					variant="warning"
					@click="loadCategory(data.item)"
					class="m-1"
				>
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button
					variant="danger"
					@click="loadCategory(data.item, 'remove')"
					class="m-1"
				>
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
import { baseUrl, showError } from "../../global";
import axios from "axios";

export default {
	name: "CategoryAdmin",
	data: function () {
		return {
			mode: "save",
			selected: null,
			category: {},
			categories: [],
			fields: [
				{ key: "categoriesId", label: "Código", sortable: true },
				{ key: "name", label: "Categoria", sortable: true },
				{ key: "actions", label: "Ações" },
			],
		};
	},

	methods: {
		reset() {
			this.category = {};
			this.mode = "save";
			this.loadCategories();
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

		save() {
			const method = this.mode === "save" ? "post" : "put";

			if (this.existsParent()) {
				this.category.parentId = this.selected;
			}
			axios[method](`${baseUrl}/categories`, this.category)
				.then(() => {
					this.reset();
					this.$toasted.global.defaultSuccess();
				})
				.then(showError);
		},

		remove() {
			const id = this.category.categoriesId;

			axios
				.delete(`${baseUrl}/categories/${id}`)
				.then(() => {
					this.reset();
					this.$toasted.global.defaultSuccess();
				})
				.catch(showError);
		},

		cancelar() {
			this.mode = "save";
			this.category = {};
		},

		loadCategory(category, mode = "save") {
			this.mode = mode;
			this.category = { ...category };
		},

		existsParent() {
			return this.selected ? true : false;
		},
	},

	mounted() {
		this.loadCategories();
	},
};
</script>

<style>
</style>