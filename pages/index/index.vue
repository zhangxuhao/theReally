<template>
	<view class="content">
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="imageFile" multiple
			:maxCount="1" v-model="aspectFit">
			<view class="upload">
				<image src="../../static/upload.png"></image>
				<text>请上传配料图</text>
			</view>
		</u-upload>

		<!-- <image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix"
			style="width: 690rpx;height: 300rpx; display:block;margin:auto"></image> -->

		<!-- <bt-cropper ref="cropper" :imageSrc="imageSrc"></bt-cropper>
		<button @click="crop">裁切</button> -->

		<l-clipper v-if="cropShow" :is-lock-ratio="false" :image-url="fileList[0].url" @success="cropOver"
			@cancel="cropCancel" />

		<view v-if="stuffList.length>0">
			<view class="line">
				<image src="../../static/gou.png"></image>
				<text>识别出 {{stuffList.length}} 种配料，准备爬取详细信息</text>
			</view>

			<u-collapse>
				<u-collapse-item :title="item.head" v-for="(item, index) in stuffList" :key="index">
					<text>{{item.body}}</text>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
	import {
		uploadImage
	} from '@/api/home.js';

	export default {
		data() {
			return {

				cropShow: false,
				currentNumebr: 0,
				fileList: [],
				stuffList: [],
			}
		},
		onLoad() {},
		methods: {
			async cropCancel() {
				this.cropOver();
			},
			async cropOver(e) {
				const url = e?.url || this.fileList[0].url;
				console.log("2", url);
				this.fileList = [{
					url,
					status: 'uploading',
					message: '上传中'
				}];
				this.cropShow = false;

				const result = await uploadImage(url);
				// if(!result){return false};

				this.fileList = [{
					url: result || url,
					status: 'success',
					message: ''
				}];

				this.stuffList = [{
					head: "赏识在于角度的转换",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true
				}, {
					head: "生活中不是缺少美，而是缺少发现美的眼睛",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				}, {
					head: "周围一些不起眼的人、事、物，或许都隐藏着不同凡响的智慧",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}]


			},
			crop() {
				// 通过组件定义的ref调用cropper方法，返回一个promise对象
				this.$refs.cropper.crop().then((e) => {
					let [err, res] = e;
					console.log(e)
					if (!err) {
						console.log(res)
					} else {
						console.error(err)
					}
				})
			},


			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1);
				this.stuffList = [];
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				console.log("event.file", event.file)
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length;

				lists.map((item) => {
					this.fileList.push({
						...item,
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const url = lists[i].url;
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						url: url
					}))
					fileListLen++;
				}


				this.cropShow = true;

			},
		}
	}
</script>

<style>
	.u-upload__wrap__preview__image {
		width: 500rpx !important;
		height:500rpx !important;
		display: block;
		margin: auto;
	}

	.u-upload__deletable {
		height: 60rpx !important;
		width: 60rpx !important;
	}

	.u-icon__icon {
		font-size: 44rpx !important;
		top: 20rpx !important;
	}

	.u-upload__wrap {
		display: block !important;
	}
</style>
<style lang="scss">
	.upload {
		width: 600rpx;
		margin: auto;
		display: block;
		height: 600rpx;
		text-align: center;

		>image {
			padding-top: 100rpx;
			height: 100rpx;
			width: 100rpx;
			display: block;
			margin: auto;
		}

		>text {
			margin-top: 20rpx;
			color: #666;
			display: block;
		}
	}

	.content {
		min-height: 100vh;
		padding: 24rpx;
		width: 750rpx;
		box-sizing: border-box;
	}

	.line {
		// width: 20rpx;
		line-height: 56rpx;
		padding: 20rpx;
		background-color: #eee;
		color: #666;
		margin-bottom: 28rpx;

		>image {
			height: 40rpx;
			width: 40rpx;
			margin-right: 10rpx;
			vertical-align: middle;
		}

		>text {
			vertical-align: middle;
			display: inline-block;
		}
	}
</style>
