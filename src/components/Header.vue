<template>
	<b-navbar toggleable="lg" type="dark" variant="info" :sticky="true">
		<b-navbar-brand href="#" tag="h1" class="mb-0">
			<img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
			电商多模态检索数据标注
		</b-navbar-brand>
		
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
		
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item href="/text-img" :active="activateIndex[0]">以词选图</b-nav-item>
				<b-nav-item href="/img-text" :active="activateIndex[1]">以图选词</b-nav-item>
				<b-nav-item href="/data-preview" :active="activateIndex[2]">数据预览</b-nav-item>
			</b-navbar-nav>
			
			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown right v-if="username !== ''">
					<!-- Using 'button-content' slot -->
					<template #button-content>
						<em>{{username}}</em>
					</template>
<!--					<b-dropdown-item href="#">Profile</b-dropdown-item>-->
					<b-dropdown-item @click="logout">退出登录</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-navbar-nav right v-else>
					<b-nav-item @click="toLogin">登录</b-nav-item>
				</b-navbar-nav>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	name: "Header",
	computed: {
		...mapState({
			username:state=>state.user.userName
		})
	},
	data(){
		return {
			activateIndex: [false, false, false]
		}
	},
	created() {
		let route = this.$route.path
		let tag = ['text-img', 'img-text', 'data-preview']
		for(let i = 0; i < tag.length; i++) {
			// console.log(route.indexOf(tag[i]))
			if(route.indexOf(tag[i]) > -1) {
				this.activateIndex[i] = true;
			} else {
				this.activateIndex[i] = false;
			}
		}
		// console.log(this.activateIndex)
		// console.log('?????', route)
	},
	methods: {
		logout() {
			this.$bvToast.toast(`退出登录`, {
				title: '提示',
				autoHideDelay: 3000,
				appendToast: false,
				variant: 'success'
			})
			this.$store.commit('clearUserName');
			this.$router.push('/')
		},
		toLogin() {
			this.$router.push('/')
		}
	}
}
</script>

<style scoped>

</style>
