import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'

// create an axios instance
const request = axios.create({
	header:{
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	// eslint-disable-next-line no-unused-vars
	transformRequest: function (data, headers) {
		return qs.stringify(data)
	},
	baseURL: '/api', // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 100000 // request timeout
})

// request interceptor
request.interceptors.request.use(
	config => {
		// do something before request is sent

		if (store.state.user.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers.Authorization = store.state.user.token
		}

		console.log("请求参数：", config);
		console.log("url：", config.url);
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
request.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response.data
		console.log("返回结果：", response);

		// if the custom code is not 20000, it is judged as an error.
		if (response.status !== 200) {
			// Message({
			// 	message: res.message || 'Error',
			// 	type: 'error',
			// 	duration: 5 * 1000
			// })

			return Promise.reject(new Error(res.message || 'Error'))
		} else {
			console.log("正常返回：", res);
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		// Message({
		// 	// message: error.response.status + ': ' + error.response.data.msg || 'Error',
		// 	message: error.response.data.msg || 'Error',
		// 	type: 'error',
		// 	duration: 5 * 1000
		// })
		return Promise.reject(error)
	}
)

export default request
