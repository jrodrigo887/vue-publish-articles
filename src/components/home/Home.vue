<template>
	<div>
		<div class="home">
			<PageTitle
				icons="fa fa-home"
				main="DashBoard"
				sub="Base de conhecimento."
			/>
		</div>
		<div class="stat">
			<Stat
				:value="stat.users"
				color="red"
				icon="fa fa-user"
				title="Usuários"
			/>
			<Stat
				:value="stat.articles"
				color="purple"
				icon="fa fa-file-text-o"
				title="Artigos"
			/>
			<Stat
				:value="stat.categories"
				color="gray"
				icon="fa fa-folder"
				title="Categorias"
			/>
		</div>
	</div>
</template>
<script>
import PageTitle from "../template/PageTitle.vue";
import Stat from "./Stat.vue";
import axios from "axios";
import { baseUrl } from "../../global";

export default {
	name: "Home",
	components: {
		PageTitle,
		Stat,
	},
	data: function () {
		return {
			stat: {},
		};
	},

	methods: {
		getStat() {
			axios.get(`${baseUrl}/stat`).then((res) => (this.stat = res.data));
		},
	},

	mounted() {
		this.getStat();
	},
};
</script>
<style>
.stat {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>