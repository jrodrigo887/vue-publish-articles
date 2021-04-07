<template>
	<div id="app" :class="{'hidden-menu': !isMenuVisible || !user}">
		<Header title="Base de Conhecimento" 
		:hidderToggle="!user" 
		:hiddenUserDropdown="!user" />
		<Menu v-if="user" />
		<loading v-if="validatingToken"/>
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";
import Loading from './components/template/Loading.vue'
import axios from 'axios'
import { baseUrl, userKey } from './global'

export default {
	name: "App",
	components: {
		Header,
		Menu,
		Footer,
		Content,
		Loading,
	},

	data: function() {
		return {
			validatingToken: true
		}
	},

	computed: mapState(['isMenuVisible', 'user']),
	methods: {
		async validateToken() {

			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)

			if(!userData) {
				this.$store.commit('setUser', null)
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			//const res = await axios.post(`${baseUrl}/login`, userData)

			if (!userData) {	
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}

			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		},
	},

	created() {
		this.validateToken()
	}	
};
</script>

<style>
* {
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}

body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;
	display: grid;
	grid-template-columns: 280px repeat(1, 1fr);
	grid-template-rows: 60px 1fr 40px;
	grid-template-areas: 
	"header header"
	"menu content"
	"menu footer";
}

#app.hidden-menu {
	display: grid;
	/* grid-template-columns: repeat(1, 1fr); */
	/* grid-template-rows: 60px 1fr 40px; */
	grid-template-areas: 
	"header header"
	"content content"
	"footer footer";
}

</style>