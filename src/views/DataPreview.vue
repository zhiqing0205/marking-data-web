<template>
	<div class="about">
		<Header></Header>
<!--		<b-alert show variant="primary">待完成</b-alert>-->
<!--		<div style="margin: 20px 0">-->
<!--			<b-card-->
<!--				b-card bg-variant="light" header="筛选图片标注进度"-->
<!--			>-->
<!--				<b-progress class="mt-2" :max="max" show-value height="2em">-->
<!--					<b-progress-bar :value="value * (6 / 10)" variant="success">-->
<!--						<span>zzq: <strong>{{ value }} / {{ max }}</strong></span>-->
<!--					</b-progress-bar>-->
<!--					<b-progress-bar :value="value * (2.5 / 10)" variant="warning">-->
<!--						<span>wyh: <strong>{{ value }} / {{ max }}</strong></span>-->
<!--					</b-progress-bar>-->
<!--				</b-progress>-->
<!--			</b-card>-->
<!--		</div>-->

<!--		<b-alert show variant="primary">选择一张最相关并且最纯净的图，没有则选择丢弃</b-alert>-->
<!--		-->
		<div style="margin: 20px auto; width: 90vw" >
			<b-button type="large" block variant="success" @click="get_new_data">刷新</b-button>
		</div>
		<div v-for="(item,index) in data" :key="index">
			<b-card class="text-center" style="margin-top: 20px">
				<div class="bg-secondary text-light">
					{{item.query_text}}
				</div>
			</b-card>

			<b-container class="bv-example-row">
				<b-row cols="2" cols-sm="3" cols-md="3" cols-lg="4" style="margin-top: 20px">
					<b-col v-for="(item1,index1) in item.imgs" :key="index1">
						<b-img  thumbnail fluid-grow :src="'data:image/png;base64,' + item1.img_data"></b-img>
					</b-col>
				</b-row>
			</b-container>
		</div>

<!--		<div style="height: 10em; width: 10em; border-right: 50px; background-color: #42b983; border-radius: 50%" >-->
<!--			<img  src="../assets/refresh.png" style="height: 8em; width: 8em;"/>-->
<!--		</div>-->

		<div style="margin: 20px auto; width: 90vw" >
			<b-button type="large" block variant="success" @click="get_new_data">刷新</b-button>
		</div>
	
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import {get_marking_data, marking_process, preview_data} from "@/api/train";
import store from "@/store";
export default {
	name: 'Home',
	components: {
		Header
	},
	data() {
		return {
			data: [],
			nowIndex: 0
		}
	},
	mounted() {
		this.get_new_data()
	},
	methods: {
		select(index) {
			console.log(index)
			this.makeToast(index)
			this.nowIndex++
		},
		confirmDelete() {
			this.boxTwo = ''
			this.$bvModal.msgBoxConfirm('所有图片都与文本无强相关嘛？', {
				title: '丢弃确认',
				size: 'sm',
				buttonSize: 'sm',
				okVariant: 'danger',
				okTitle: 'YES',
				cancelTitle: 'NO',
				footerClass: 'p-2',
				hideHeaderClose: false,
				centered: true
			})
				.then(value => {
					if (value === true) {
						this.nowIndex++;
					}
				})
				.catch(err => {
					// An error occurred
				})
		},
		makeToast(index) {
			// this.toastCount++
			this.$bvToast.toast(`你选择了第${index}个，已加载下一个图文对`, {
				title: '提示',
				autoHideDelay: 3000,
				appendToast: false,
				variant: 'success'
			})
		},
		get_new_data() {
			preview_data(store.state.user.userName).then((res) => {
				this.data = res.preview_data
			})

			this.goToTop()
		},
		goToTop() { //回到顶部方法 点击按钮调用
			let top = document.documentElement.scrollTop;
			// 实现滚动效果
			const timeTop = setInterval(() => {
				document.documentElement.scrollTop = top -= 50;
				if (top <= 0) {
					clearInterval(timeTop); //清除定时器
				}
			}, 10);
		}
	}
}
</script>
