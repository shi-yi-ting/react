## 安装

[官网链接](https://element.eleme.cn/#/zh-CN/component/installation)

```
npm i element-ui -S
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
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// import md from 'vite-plugin-md' // markDown文件处理

// 适配
import postCssPxToRem from 'postcss-pxtorem'

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
            eslintrc: {
                enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
                filepath: './.eslintrc-auto-import.json', // 指定自动导入函数 eslint 规则的文件
            },
            dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({ // 按需加载自定义组件
            deep: true, // 搜索子目录
            dirs: ['src/components'], // 按需加载的文件夹
            resolvers: [
                ElementPlusResolver(), // ElementPlus按需加载
                AntDesignVueResolver(), // 貌似这种还无法 4 版本的样式
            ],
        }),
    ],

    resolve: {
        alias: {
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@': pathSrc,
            '/\\.md$/': 'raw-loader', // 添加 .md 文件处理的自定义加载器
        },
    },

    // css: {
    //     postcss: {
    //         plugins: [
    //             postCssPxToRem({
    //                 // 自适应，px>rem转换
    //                 rootValue: 16, // 相当与把窗口切成120等份
    //                 propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
    //                 selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
    //             }),
    //         ],
    //     },
    // },
})
```

### 使用

```
<a-space>
    <a-popconfirm title="确定删除?" okText="删除" @confirm="deleteItem(record.id)">
        <el-button size="small" danger @click.stop>删除</el-button>
    </a-popconfirm>
</a-space>
```

## 第二中导入方式

**1.首先在src文件夹下新建一个plugins文件夹，里面新建element.js，内容如下：**

```
import {
ElButton,
ElForm,
ElFormItem,
ElInput,
ElMessage,
ElContainer,
ElHeader,
ElAside,
ElMain,
ElMenu,
// ElSubmenu,
ElMenuItem,
ElBreadcrumb,
ElBreadcrumbItem,
ElCard,
ElRow,
ElCol,
ElTable,
ElTableColumn,
ElSwitch,
ElTooltip,
ElPagination,
ElDialog,
ElMessageBox,
ElTag,
ElTree,
ElSelect,
ElOption,
ElCascader,
ElAlert,
ElTabs,
ElTabPane,
ElSteps,
ElStep,
ElCheckboxGroup,
ElCheckbox,
ElUpload,
ElPopover, // 弹框
ElLoading, // 加载。。。
ElDatePicker,
ElDropdown,
ElDropdownMenu,
ElDropdownItem,
} from 'element-plus'
import 'element-plus/dist/index.css'

export const setupElement = (app) => {
console.log('app', app)
app.component('ElButton', ElButton)
app.component('ElForm', ElForm)
app.component('ElFormItem', ElFormItem)
app.component('ElInput', ElInput)
app.component('ElMessage', ElMessage)
app.component('ElContainer', ElContainer)
app.component('ElHeader', ElHeader)
app.component('ElAside', ElAside)
app.component('ElMain', ElMain)
app.component('ElMenu', ElMenu)
// app.component('ElSubmenu', ElSubmenu)
app.component('ElMenuItem', ElMenuItem)
app.component('ElBreadcrumb', ElBreadcrumb)
app.component('ElBreadcrumbItem', ElBreadcrumbItem)
app.component('ElCard', ElCard)
app.component('ElRow', ElRow)
app.component('ElCol', ElCol)
app.component('ElTable', ElTable)
app.component('ElTableColumn', ElTableColumn)
app.component('ElSwitch', ElSwitch)
app.component('ElTooltip', ElTooltip)
app.component('ElPagination', ElPagination)
app.component('ElDialog', ElDialog)
app.component('ElMessageBox', ElMessageBox)
app.component('ElTag', ElTag)
app.component('ElTree', ElTree)
app.component('ElSelect', ElSelect)
app.component('ElOption', ElOption)
app.component('ElCascader', ElCascader)
app.component('ElAlert', ElAlert)
app.component('ElTabs', ElTabs)
app.component('ElTabPane', ElTabPane)
app.component('ElSteps', ElSteps)
app.component('ElStep', ElStep)
app.component('ElCheckboxGroup', ElCheckboxGroup)
app.component('ElCheckbox', ElCheckbox)
app.component('ElUpload', ElUpload)
app.component('ElPopover', ElPopover)
app.component('ElLoading', ElLoading)
app.component('ElDatePicker', ElDatePicker)
app.component('ElDropdown', ElDropdown)
app.component('ElDropdownMenu', ElDropdownMenu)
app.component('ElDropdownItem', ElDropdownItem)
}
```


**2.在main.js中导入使用暴漏出来的函数传参app，如下：**

```
import { createApp } from 'vue'
import App from './App.vue'

// import router from './router'
import { setupRouter } from '@/router/index.js'
import { setupElement } from '@/plugins/element.js'
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
setupElement(app) // ui库注册
setupIcons(app)
setupBaseComponents(app)

app.mount('#app')
```
