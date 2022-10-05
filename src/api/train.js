import request from "@/utils/ajax";

export const marking_process = () => {
	return request({
		url: '/train/get_marking_process/',
		method: 'get',
	})
}

export const get_marking_data = (name,cnt) => {
	return request({
		url: `/train/get_marking_data/${name}/${cnt}/`,
		method: 'get',
	})
}

export const marking_data = (data) => {
	return request({
		url: '/train/marking_data/',
		method: 'post',
		data: data
	})
}

export const preview_data = () => {
	return request({
		url: '/train/preview_data/',
		method: 'get',
	})
}

