<template>
	<div class="user-admin">
		<b-container fluid>
			<b-form>
				<input type="hidden" id="user-id" v-model="user.userId" />
				<b-row>
					<b-col md="6" sm="12">
						<b-form-group
							id="input-group-name"
							label="Nome"
							label-for="input-name"
						>
							<b-form-input
								id="input-name"
								v-model="user.name"
								type="text"
								placeholder="Informe o seu nome."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
					<b-col md="6" sm="12">
						<b-form-group
							id="input-group-email"
							label="Email"
							label-for="input-email"
						>
							<b-form-input
								id="input-email"
								v-model="user.email"
								type="text"
								placeholder="Informe o seu email."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row align-h="center" class="mt-3 mb-2">
					<b-col cols="12">
						<b-form-group
							id="input-group-tipo"
							label="Tipo usuário"
							label-for="input-tipo"
						>
							<b-form-radio-group
								v-model="user.roles"
								name="radio-inline"
								:options="tiposUsers"
								:disabled="mode === 'remove'"
							></b-form-radio-group>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row v-show="mode === 'save'">
					<b-col md="6" sm="12">
						<b-form-group
							id="input-group-senha"
							label="Senha"
							label-for="input-senha"
						>
							<b-form-input
								id="input-senha"
								v-model="user.password"
								type="text"
								placeholder="Digite uma senha segura"
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
						</b-form-group>
					</b-col>
					<b-col md="6" sm="12">
						<b-form-group
							id="input-group-confirmSenha"
							label="Confirmar Senha"
							label-for="input-confirmSenha"
						>
							<b-form-input
								id="input-confirmSenha"
								v-model="user.confirmarPassword"
								type="text"
								placeholder="Confirme a senha digitada anteriormente."
								required
								:readonly="mode === 'remove'"
							>
							</b-form-input>
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
		<b-table striped hover :fields="fields" :items="users" align-item="center">
			<template slot="actions" slot-scope="data">
				<b-button
					variant="warning"
					@click="loadUser(data.item)"
					class="m-1"
				>
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button 
				variant="danger" 
				@click="loadUser(data.item, 'remove')"
				class="m-2">
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
	name: "UserAdmin",
	data: function () {
		return {
			mode: "save",
			typeUser: "",
			tiposUsers: [
				{ text: "Visitante", value: "visitante" },
				{ text: "Funcionário", value: "funcionario" },
				{ text: "Gerente", value: "gerente" },
				{ text: "Administrador", value: "administrador" },
			],
			user: {},
			users: [],
			fields: [
				{ key: "userId", label: "Código", sortable: true },
				{ key: "name", label: "Nome", sortable: true },
				{ key: "email", label: "E-mail", sortable: true },
				{ key: "roles", label: "Tipo Usuário", sortable: true },
				{ key: "actions", label: "Ações" },
			],
		};
	},

	methods: {
		loadUsers() {
			const url = `${baseUrl}/Users`;
			axios.get(url).then((res) => {
				this.users = res.data;
			});
		},

		reset() {
			(this.mode = "save"), (this.user = {}), this.loadUsers();
		},

		save() {
			const method = this.user.userId ? "put" : "post";
			const id = this.user.userId ? `/${this.user.userId}` : "";
			axios[method](`${baseUrl}/users${id}`, this.user)
				.then(() => {
					this.$toasted.global.defaultSuccess();
					this.reset();
				})
				.catch(showError);
		},

		remove() {
			const id = this.user.userId;
			//const url = `https://localhost:5001/api/Users`
			axios
				.delete(`${baseUrl}/users/${id}`)
				.then(() => {
					this.$toasted.global.defaultSuccess();
					this.reset();
				})
				.catch(showError);
		},

		loadUser(user, mode = "save") {
			this.mode = mode;
			this.user = { ...user };
		},

		cancelar() {
			this.mode = "save";
			this.user = {};
		},
	},

	mounted() {
		this.loadUsers();
	},
};
</script>

<style>
</style>