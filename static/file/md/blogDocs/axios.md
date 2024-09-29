## axios封装

### 安装依赖

```
npm install- save axios
```

### 接口不做统一管理的

这种我们一般会在src目录下新建一个globals文件夹用来存放全局变量，在globals文件夹中新建一个window文件夹和一个globals.js文件，window文件夹中新建axios.js

#### axios.js

```
/* eslint no-shadow: 'off' */
import axios from 'axios'

axios.interceptors.request.use((config) => {
  if (!config.url) { return }
  const csrfToken = store.getters.getCsrfToken
  if (csrfToken ) {
	config.headers['xcsrf-token'] = csrfToken
  }
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    if (['10002', '10003'].includes(response.data)) { // 重新登录处理
        redirectLogin($this.$route)
        return undefined
    }
    return response
}, (error) => {
    return Promise.reject(error) // 这里可以根据后台返回的状态码进行错误处理
})

export {
    axios
}
```

#### globals.js

```
/* eslint no-shadow: 'off' */

import { axios, axiosCache } from './window/axios.js'
window.axios = axios
window.axiosCache = axiosCache

import qs from 'qs'
window.qs = qs

import async from 'async'
window.async = async

import cookie from 'js-cookie'
window.cookie = cookie

import is from './window/is.js'
window.is = is

import lodash from './window/lodash.js'
window.lodash = lodash
window.debounce = lodash.debounce

import util from './window/util.js'
window.util = util

import dayjs from './window/dayjs'
window.dayjs = dayjs

import jQuery from 'jquery'
window.$ = jQuery
window.jquery = jQuery
window.jQuery = jQuery // provide global variables for jquery plugin

Date.prototype.Format = function(fmt) {
    // author: meizz
    let o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'H+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S+': this.getMilliseconds(), // 毫秒
    }

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }

    return fmt
}

// window.downloadFile = function(url) {
//     try {
//         let elemIF = document.createElement('iframe')
//         elemlF.src = url
//         elemlF.style.display = 'none'
//         document.body.appendChild(elemIF)
//     } catch (e) {
//         console.log('下载失败=========' + url)
//     }
// }
```

#### main.js（在main.js中导入）

```
import App from '@/App.vue'
import i18n from '@/i18n/index.js'
import store from '@/store/index.js'
import router from '@/router/index.js'

import '@/globals/globals.js'

import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

const $app = new Vue({
    i18n,
    store,
    router,
    render: (h) => h(App),
}).$mount('#app')

window.$this = $app
```

#### 根目录下新建 .eslintrc.js

如果有eslint校验可能会爆红，需要在.eslintrc.js进行处理如下，主要是globals

```
// eslint-disable @typescript-eslint/no-var-requires

const base = require('./eslint/eslint.base.js')
// const typescript = require('./eslint/eslint.typescript.js')
const vue = require('./eslint/eslint.vue.js')

module.exports = {
    root: true,
    env: {
        node: true,
        es2020: true,
    },
    extends: [
        // 'eslint: recommended',
        // '@vue/typescript/recommended',
        // 'plugin: vue/recommended',

        ...base.extents,
        // ...typescript.extends,
        ...vue.extends,
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        // parser: 'babel-eslint',
    },
    plugins: [
        // '@typescript-eslint',

        ...base.plugins,
        // ...typescript.plugins,
        ...vue.plugins,
    ],
    globals: {
        $this: false,

        $t: false,
        $tc: false,

        qs: false,
        axios: false,
        axiosCache: false,

        async: false,
        cookie: false,
        dayjs: false,
        debounce: false,
        debounceAsync: false,
        Decimal: false,
        is: false,
        jQuery: false,
        lodash: false,
        $: false,

        util: false,
        storage: false,
    },
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'

        ...base.rules,
        // ...typescript.rules,
        ...vue.rules,
        'linebreak-style': ['off'],
        'vue/multi-word-component-names': 'off',
        'vue/no-v-model-argument': ['off'],
    },
}
```

#### 使用方式

```
//  方式一
$this.$loading.show()  // 显示加载动画
let resp = await axios({
    method: 'post',
    url: '/commonBaseService/getCommonServiceData',
    data: {
        worker: 'factoryServiceImpl',
        workerType: 'searchAllFactory',
    },
})
$this.$loading.hide() // 隐藏加载动画
if (resp.data.dataFlag && resp.data.data) {
    options.factoryOptions = resp.data.data.map((item) => {
        return {
            value: item.factory_id,
            label: item.factory_name,
        }
    })
}
```

```
// 方式二
axios({
    method: 'post',
    url: '/special/softwareApi/mail/queryUserInfoByText.do',
    data: qs.stringify({ text: query }),
    cancelToken: source.token,
}).then((resp) => {
    obj.loading = false
    if (resp.data.dataFlag) {
        obj.options = resp.data.data
    }
}).catch((thrown) => {
    if (!axios.isCancel(thrown)) {
        console.error('thrown ajax: ', thrown)
        obj.loading = false
    }
})
```

### 接口统一管理的

在src目录下新建一个api文件夹，文件夹里面新建axios.js和request.js

#### axios.js

```
import axios from 'axios'

const instance = axios.create({
    // baseURL: "https://api.example.com", // 根据你的需求设置基础URL
    baseURL: '', // 根据你的需求设置基础URL
    timeout: 5000, // 请求超时时间，根据需要设置
})

// 在请求发送之前，可以添加一些全局的请求拦截器
instance.interceptors.request.use(
    (config) => {
    // 在请求发送之前可以做一些处理，如添加请求头等
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// 在响应收到之后，可以添加一些全局的响应拦截器
instance.interceptors.response.use(
    (response) => {
    // 在响应收到之后可以做一些处理，如解析数据等
        return response
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default instance
```

#### request.js

```
import http from '@/api/axios.js'
import qs from 'qs'

// 登录信息
export const samlRequestApi = () => http.post('auth/saml/request')

// 登出
export const logoutApi = () => http.post('auth/token/logout')

// 检查token
export const tokenCheckApi = () => http.post('auth/token/check')

// 服务信息列表
export const serviceMsgListApi = (params) => http.post('servicemsg/list', params)


// rtc信息
export const rtcConfigApi = (params) => http.post('rtcConfig', qs.stringify(params))

// 统计信息
export const recordFrequencyApi = () => http.get('record/frequency')
```

#### 使用

```
import {  rtcConfigApi } from '@/api/request.js
// 方式三
// 根据roomId, userId, 时间间隔 获取rtc加入的秘钥
async getRtcConfig(isFreshJoin, roomId, userId, timeout) {
    if (roomId && userId && timeout) {
        try {
            const tempData = await rtcConfigApi({ roomId, userId, timeout })
            const data = tempData ? tempData.data : {}
            const respData = data.data ? data.data : {}
            this.appId = respData.appId
            this.rtcDomain = respData.rtcDomain
            this.rtcSignature = respData.rtcSignature
            this.expiredTime = respData.expiredTime
        } catch (error) {
            // 刷新重新进入房间的时候接口报错要跳转用户已离开
            if (isFreshJoin) {
                this.clientLeaveRoomDesk()
            }
            console.log('error', error)
        }
    } else {
        this.message.warning(this.$t('message.joinException'))
    }
},
```
