## 安装

[官网链接](https://antdv.com/docs/vue/getting-started-cn)

```
npm i --save ant-design-vue@4.x
```

## 注册

使用 `unplugin-auto-import`，`unplugin-vue-components`按需自动导入

### 安装相关依赖

```
npm install unplugin-auto-import -D
npm install unplugin-vue-components -D
```

### 在vite.config.js中进行配置

```
/* eslint-disable new-cap */
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')

import AutoImport from 'unplugin-auto-import/vite' // 按需自动导入API
import Components from 'unplugin-vue-components/vite' // 按需自动导入组件

// 这里导入了两个一个是ElementPlusResolver，一个是AntDesignVueResolver
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0', // ip地址
        port: 8080, // 端口
        // open: true, // 服务启动时自动在浏览器中打开应用
        // https: false,//是否启用 http 2
        // cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
        // strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
        // force: true,//是否强制依赖预构建
        // hmr: true,//禁用或配置 HMR 连接
    },

    plugins: [
        vue(),
        AutoImport({ // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({ // 按需加载自定义组件
            resolvers: [
                ElementPlusResolver(), // ElementPlus按需加载
                AntDesignVueResolver(), // 貌似这种还无法 4 版本的样式
            ],
        }),
    ]
})
```

### 使用

在组件中直接可通过a-xxx的形式使用，不用在main导入`import 'ant-design-vue/dist/antd.css'，但是有遇到样式出不来的情况，建议可以在main中导入；因为在使用antDesign的icon的时候还是需要导入这个，不然样式出不来

```
<a-space>
    <a-popconfirm title="确定删除?" okText="删除" @confirm="deleteItem(record.id)">
        <a-button size="small" danger @click.stop>删除</a-button>
    </a-popconfirm>
</a-space>
```

## Icon的使用

也是可以进行按上述方式进行按需导入设置，但是目前尚未解决，目前的导入方式是全局导入
**1.首先在src文件夹下新建一个plugins文件夹，里面新建antIcons.js，内容如下：**

```
import * as Icons from '@ant-design/icons-vue'

export const setupIcons = (app) => {
    // console.log('Icons', Icons)
    Object.keys(Icons).forEach((item) => {
        app.component(`${item}`, Icons[item])
    })
}
```

**2.在main.js中导入使用暴漏出来的函数传参app，如下：**

```
import { createApp } from 'vue'
import App from './App.vue'

// import router from './router'
import { setupRouter } from '@/router/index.js'
// import { setupElement } from '@/plugins/element.js'
import { setupIcons } from '@/plugins/antIcons.js'
import { setupBaseComponents } from '@/plugins/base.ts'


// import './assets/main.css'
import '@/assets/css/common.css'
import 'ant-design-vue/dist/antd.css' // 这里不导入的话在js中使用的ant组件样式将出不来

import '@/globals/globals.js'

// 页面适配
// import 'amfe-flexible' // 适用与H5，貌似不适用pc端
// import 'lib-flexible/flexible' // 适用与H5，貌似不适用pc端
// import '@/utils/rem.js'

const app = createApp(App)

setupRouter(app) // 挂载 路由 --- 原来：app.use(router)
// setupElement(app) // ui库注册
setupIcons(app)
setupBaseComponents(app)

app.mount('#app')
```
