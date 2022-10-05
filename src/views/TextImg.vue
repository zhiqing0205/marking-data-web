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
					<b-progress-bar v-for="(item,index) in process_data" :key="index" :value="100*item.done/item.all" :variant="variant_list[index]">
						<span>{{item.name}}: <strong>{{ item.done }} / {{ item.all }}</strong></span>
					</b-progress-bar>
<!--					<b-progress-bar :value="value * (2.5 / 10)" variant="warning">-->
<!--						<span>wyh: <strong>{{ value }} / {{ max }}</strong></span>-->
<!--					</b-progress-bar>-->
				</b-progress>
			</b-card>
		</div>

		<b-alert show variant="primary">选择一张最相关并且最纯净的图，没有则选择丢弃</b-alert>
		
		<div style="text-align: center" v-if="data !== []">
			<b-jumbotron header-level="5" :header="data[nowIndex].query_text">
			</b-jumbotron>
		</div>
		
		<b-container class="bv-example-row" v-if="data !== []">
			<b-row cols="2" cols-sm="2" cols-md="3" cols-lg="4">
				<b-col v-for="(item,index) in data[nowIndex].imgs" :key="index" @click="select(index)">
					<b-img thumbnail fluid-grow :src="'data:image/png;base64,' + item.img_data" :alt="index + ''"></b-img>
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
import {get_marking_data, marking_data, marking_process} from "@/api/train";
import {mapState} from "vuex";
import store from "@/store";
export default {
	name: 'Home',
	components: {
		Header
	},
	computed: {
		...mapState({
			username:state=>state.user.userName
		})
	},
	data() {
		return {
			max: 100,
			data: [],
			nowIndex: 0,
			variant_list: ['success', 'warning', 'danger'],
			process_data: [],
		}
	},
	mounted() {
		marking_process().then((res) => {
			console.log('res', res)
			this.process_data = res.process_data
			// console.log(this.process_data)
		})
		
		this.get_new_data(5)
	},
	methods:{
		select(index) {
			// console.log(index)
			this.makeToast(index+1)
			
			let formData = {
				'query_id': this.data[this.nowIndex].query_id,
				'username': store.state.user.userName,
				'select': index,
				'is_discard': false,
			}
			
			marking_data(formData).then((res) => {
			
			})
			
			this.update_process()
			this.nowIndex++
			if(this.data.length - this.nowIndex < 5) {
				this.get_new_data()
			}
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
					// console.log(value, value === true)
					if(value === true) {
						let formData = {
							'query_id': this.data[this.nowIndex].query_id,
							'username': store.state.user.userName,
							'select': 1000000,
							'is_discard': true,
						}

						marking_data(formData);
						this.update_process()
						this.nowIndex++
						
						if(this.data.length - this.nowIndex < 5) {
							this.get_new_data()
						}
					}
				})
				.catch(err => {
					// An error occurred
				})
		},
		makeToast(index) {
			// this.toastCount++
			let done = 0
			for(let i = 0; i < this.process_data.length; i++) {
				let item = this.process_data[i];
				if(item.name === store.state.user.userName) {
					done = item.done
					break;
				}
			}
			
			this.$bvToast.toast(`你选择了第${index}个，已加载下一个图文对(已标注${done}个数据)`, {
				title: '提示',
				autoHideDelay: 3000,
				appendToast: false,
				variant: 'success'
			})
		},
		get_new_data(cnt = 10) {
			get_marking_data(store.state.user.userName,cnt).then((res) => {
				if(this.data.length === 0) {
					this.data = res.train_query_data
				} else {
					this.data = [...this.data, ...res.train_query_data]
				}
				
				// this.data = res.train_query_data
			})
		},
		update_process() {
			// console.log(this.process_data)
			for(let i = 0; i < this.process_data.length; i++) {
				let item = this.process_data[i];
				if(item.name === store.state.user.userName) {
					item.done++;
					break;
				}
			}
		}
	}
}
</script>
