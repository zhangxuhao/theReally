<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			
			  <u--input
			    placeholder="请输入内容"
			    border="surround"
			    clearable
			  ></u--input>
		</view>
	</view>
</template>

<script>
	import {getUserInfo,userLogin} from "@/api/user.js"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getdata(){
				//this.$util.isLogin('login') 加参数时如果token为空则直接跳转到登录页
				if(this.$util.isLogin()){
					//获取用户信息,拦截器里已经判断是否有token,所以这里无需写token参数
					getUserInfo().then(res => {
						console.log(res)
					})
				}else{
					//获取用户信息
					userLogin({username:'zhangsan',password:'1234'}).then(res => {
						console.log(res)
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
