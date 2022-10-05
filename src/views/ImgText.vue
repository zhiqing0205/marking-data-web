<template>
	<div class="about">

<!--		标注进度-->
<!--		<b-progress class="mt-2" :max="max" show-value>-->
<!--			<b-progress-bar :value="value * (6 / 10)" variant="success"></b-progress-bar>-->
<!--			<b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar>-->
<!--		</b-progress>-->
		
		<Header></Header>
		<div style="margin: 20px 0">
			<b-card
				b-card bg-variant="light" header="筛选图片标注进度"
			>
				<b-progress class="mt-2" :max="max" show-value height="2em">
					<b-progress-bar :value="value * (6 / 10)" variant="success">
						<span>zzq: <strong>{{ value }} / {{ max }}</strong></span>
					</b-progress-bar>
					<b-progress-bar :value="value * (2.5 / 10)" variant="warning">
						<span>wyh: <strong>{{ value }} / {{ max }}</strong></span>
					</b-progress-bar>
				</b-progress>
			</b-card>
		</div>

		<b-alert show variant="primary">选择一张最相关并且最纯净的图，没有则选择丢弃</b-alert>
		
		<div style="text-align: center">
			<b-jumbotron header-level="5" :header="data[nowIndex].text">
			</b-jumbotron>
		</div>
		
		<b-container class="bv-example-row">
			<b-row cols="2" cols-sm="3" cols-md="4" cols-lg="5">
				<b-col v-for="(item,index) in data[nowIndex].imgs" :key="index" @click="select(index)">
					<b-img thumbnail fluid :src="item" alt="Image 1"></b-img>
				</b-col>
			</b-row>
		</b-container>

		<div style="margin: 20px auto; width: 90vw" >
			<b-button type="large" block variant="danger" @click="confirmDelete">丢弃图文对</b-button>
		</div>
		
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
	name: 'Home',
	components: {
		Header
	},
	data() {
		return {
			value: 45,
			max: 100,
			data: [{
				id: 0,
				text: '123',
				imgs: ['https://picsum.photos/250/250/?image=54','https://picsum.photos/250/250/?image=54']
			},{
				id: 2,
				text: '456',
				imgs: ['https://picsum.photos/250/250/?image=54','https://picsum.photos/250/250/?image=54','https://picsum.photos/250/250/?image=54','https://picsum.photos/250/250/?image=54','https://picsum.photos/250/250/?image=54','https://picsum.photos/250/250/?image=54']
			},
				{
					id: 3,
					text: '789',
					imgs: ['https://picsum.photos/250/250/?image=54']
				}],
			nowIndex: 0
		}
	},
	created() {
		// this.$bvToast.toast(`待图片完成清洗后开放`, {
		// 	title: '提示',
		// 	autoHideDelay: 3000,
		// 	appendToast: false,
		// 	variant: 'success'
		// })
		alert('待图片完成清洗后开放')
		this.$router.back()
	},
	methods:{
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
					if(value === true) {
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
		}
	}
}
</script>
