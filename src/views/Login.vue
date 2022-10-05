<template>
	<div class="home">
		<form id="loginForm" class="form-signin">
			<h2 class="form-signin-heading"><i class="glyphicon glyphicon-log-in"></i> 用户登录</h2>
			<div class="form-group has-success has-feedback">
<!--				<input type="text" class="form-control" id="username" name="username" placeholder="请输入登录账号" autofocus>-->
				<b-form-input v-model="username" placeholder="请输入用户名"></b-form-input>
<!--				<span class="glyphicon glyphicon-user form-control-feedback"></span>-->
			</div>
			<div class="form-group has-success has-feedback">
<!--				<input type="password" class="form-control" id="password" name="password" placeholder="请输入登录密码" style="margin-top:10px;">-->
<!--				<span class="glyphicon glyphicon-lock form-control-feedback"></span>-->
				<b-form-input v-model="password" type="password" placeholder="请输入密码"></b-form-input>
			</div>
			<div class="checkbox">
<!--				<label>-->
<!--					<input id="rememberme" type="checkbox" value="1"> 记住我-->
<!--				</label>-->
				<label style="float:right">
<!--					<a @click="toPreviewData">不登录仅预览数据</a>-->
					<b-button variant="link" @click="toPreviewData">不登录仅预览数据</b-button>
				</label>
			</div>
<!--			<a class="btn btn-lg btn-success btn-block" onclick="doLogin" > 登录</a>-->
			<b-button block variant="success" @click="doLogin">登录</b-button>
		</form>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'
import store from "@/store";

export default {
	name: 'Home',
	components: {
		HelloWorld,
		Header
	},
	data() {
		return {
			username: '',
			password: ''
		}
	},
	mounted() {
		if(store.state.user.userName !== '') {
			this.$bvToast.toast(`已登陆，正在跳转`, {
				title: '提示',
				autoHideDelay: 3000,
				appendToast: false,
				variant: 'success'
			})

			// this.$store.commit('setUserName', this.username)
			this.$router.push('/text-img');
		}
	},
	methods: {
		doLogin() {
			if(this.username === '' || this.password === '') {
				this.$bvToast.toast(`请完整输入信息！`, {
					title: '警告',
					autoHideDelay: 3000,
					appendToast: false,
					variant: 'danger'
				})
			} else if((this.username !== 'wyh' && this.username !== 'zzq') || this.password !== 'nuaa-feng') {
				this.$bvToast.toast(`用户名或密码错误！`, {
					title: '警告',
					autoHideDelay: 3000,
					appendToast: false,
					variant: 'danger'
				})
				
				this.password = ''
			} else {
				this.$bvToast.toast(`登录成功！！`, {
					title: '提示',
					autoHideDelay: 3000,
					appendToast: false,
					variant: 'success'
				})
				
				this.$store.commit('setUserName', this.username)
				this.$router.push('/text-img');
				
			}
		},
		toPreviewData() {
			this.$router.push('/data-preview');
		}
	}
}
</script>

<style>
body {
	padding-top: 40px;
	padding-bottom: 40px;
	background-color: #eee;
}

.form-signin {
	max-width: 330px;
	padding: 15px;
	margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
	margin-bottom: 10px;
}
.form-signin .checkbox {
	font-weight: normal;
}
.form-signin .form-control {
	position: relative;
	height: auto;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding: 10px;
	font-size: 16px;
}
.form-signin .form-control:focus {
	z-index: 2;
}
.form-signin input[type="email"] {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

</style>