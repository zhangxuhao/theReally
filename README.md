# uniapp-template

#### 介绍
uniapp开发基础模板，对uniapp请求进行了简单封装，实现请求拦截及响应处理，同时引用了 uView2.0 封装的http请求，可以通过配置切换；

#### 软件架构
uniapp+uView2.0

###	项目结构
```
├─api				// 接口管理
│  ├─user.js 		        // 示例
├─common			// 公共文件
│  ├─config 			// 环境配置 开发、生产环境地址配置，是否开发模式配置，超时时间，请求日志开启状态等
│  ├─filters 			// 全局过滤器
│  ├─uni.interface 		// uniapp请求模式下的请求及响应处理；
│  ├─uview.interface 		// vuiew请求模式下的请求及响应处理(uView2.0)
│  └─utils 			// 常用公共方法
├─uni_modules			// 插件市场插件目录
│  └─uview-ui			// uview-ui	
```

###  使用方法
```
    api/user.js
        //如果用uni请求
        import http from '@/common/uni.interface.js';

        //如果是用uview请求,就用下面这句
        //const http = uni.$u.http

        //获取用户信息
        export function getUserInfo(params){
	    return http.get('api/userinfo', params)
        }

        //用户登录
        export function userLogin(params){
	    return http.post('api/login', params)
        }

        //更改配置项，阻止loading提示
        export function userLogin(params){
            return http.post('api/login', {custom:{ShowLoading:false}})
        }

    页面导入接口文件
    import {getUserInfo,userLogin} from "@/api/user.js"

    getUserInfo().then(res => {
	console.log(res)
    })

    userLogin({username:'zhangsan',password:'1234'}).then(res => {
	console.log(res)
    })

```


#### 仓库地址

[gitee](https://gitee.com/gefucai/uniapp-template.git)

