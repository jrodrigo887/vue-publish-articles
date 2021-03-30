<template>
	<header class="header">

		<a class="toggle" @click="toggleMenu()" v-if="!hidderToggle">
			<i class="fa" :class="icon"/> 
		</a>

		<h1 class="title">
			{{ title }}
		</h1>

        <user-drop-down v-if="!hiddenUserDropdown" class="user-dropdown"/>

		
	</header>
</template>

<script>
import UserDropDown from './UserDropDown.vue';

export default {
	name: "Header",
    components: { UserDropDown },
	props: {
		title: String,
		hidderToggle: Boolean,
        hiddenUserDropdown: Boolean
	},

    computed: {
        icon() {
            return this.$store.state.isMenuVisible? "fa-angle-left" : "fa-angle-right"  
        }
    },

    methods: {
        toggleMenu() {
          this.$store.commit("toggleMenu")
        }
    }
};
</script>

<style>
.header {
	grid-area: header;
	background: linear-gradient(to right, #1e469a, #49a7c1);
	display: flex;
	justify-content: center;
	align-items: center;
}

.title {
    font-size: 1.2rem;
    color: white;
    font-weight: 100;
    flex-grow: 1;
    text-align: center;
}

.title a {
    color: white;
    text-decoration: none; 
}

header.header > a.toggle {
    color: #fff;
    width: 60px;
    height: 100%;
    justify-self: flex-start;
    align-items: center;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-content: center;
}

header.header > a.toggle:hover { 
    color: #fff;
    background: linear-Gradient(to right, #95a5a65b, #ecf0f125);
}





</style>