//如果用uni请求
import http from '@/common/uni.interface.js';
import {
	urls
} from '@/utils/index.js';

//如果是用uview请求,就用下面这句
//const http = uni.$u.http


//获取用户信息
export function uploadImage(url) {
	return new Promise((resolve, reject) => {
		 uni.uploadFile({
			url: urls.uploadImage, // 仅为示例，非真实的接口地址
			filePath: url,
			name: 'file',
			formData: {
				user: 'test'
			},
			success: (res) => {
				setTimeout(() => {
					resolve(res.data.data)
				}, 1000)
			},
			fail:reject
		});
	})
}
