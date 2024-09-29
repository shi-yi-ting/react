## 路由导航守卫

### 全局路由导航守卫的使用

```
import Vue from 'vue'
import VueRouter from 'vue-router'

import $store from '@/store/index.js'

import homeRouter from '@/views/home/router.js'
import vueRouter from '@/views/vue/router.js'
import devdocsRouter from '@/views/devdocs/router.js'
import websiteRouter from '@/views/website/router.js'
import componentRouter from '@/views/component/router.js'
import demoRouter from '@/views/demo/router.js'
import interviewRouter from '@/views/interview/router.js'
import mongodbRouter from '@/views/mongodb/router.js'

Vue.use(VueRouter)
let routerSettings = {
    routes: [
        homeRouter,
        vueRouter,
        devdocsRouter,
        websiteRouter,
        componentRouter,
        demoRouter,
        interviewRouter,
        mongodbRouter,

        {
            path: '/login',
            name: 'login',
            meta: { title: 'login' },
            component: () => import(/* webpackChunkName: "home" */ '@/components/common/login/login.vue'),
        },
    ],
}

const router = new VueRouter(routerSettings)

router.onReady(() => { // 把一个回调排队，在路由完成初始导航时调用。（刷新页面的时候才执行???）
    console.log('进入router.onReady了(刷新页面的时候执行???)')
    $store.commit('$setState', { key: 'showAppLoading', value: false }) // 关闭loading加载组件
})

// 路由导航守卫，路由跳转之前执行
router.beforeEach((to, from, next) => {
    console.log('进入router.beforeEach了', routerSettings.routes)

    // 进入模块前执行 enter
    if (to.matched.length > 0) {
        console.log('to', to)

        let toModuleName = to.matched[0].name
        $store.commit('$setState', { key: 'moduleNow', value: toModuleName })

        console.log('toModuleName', toModuleName)
    }

    next()
})

// 路由导航守卫，在跳转之后执行
// eslint-disable-next-line consistent-return
router.afterEach((to /* , from*/) => {
    console.log('进入router.afterEach了')
    if (to.matched.length === 0) {
        return false
    }

    // 获取 path meta
    let meta = $store.getters.getPathMeta(to)

    // 进入页面后配置 topHeader激活菜单项
    let headerActive = (meta.header || {}).active || undefined
    if ($store.state.header.active !== headerActive) {
        $store.commit('$setState', {
            key: 'header.active',
            value: headerActive,
        })
    }

    // // 进入页面后配置 menusHide
    // let menusHide = meta.menusHide || false
    // if ($store.state.menusHide !== menusHide) {
    //     $store.commit('$setState', {
    //         key: 'menusHide',
    //         value: menusHide,
    //     })
    // }

    // // 进入页面后配置 breadCrumb.hidletbread CrumbLeftPad
    // let breadCrumbLeftPad = (meta.breadCrumb || {}).leftPad || false
    // if ($store.state.breadCrumb.leftPad !== breadCrumbLeftPad) {
    //     $store.commit('$setState', {
    //         key: 'breadCrumb.leftPad',
    //         value: breadCrumbLeftPad,
    //     })
    // }


    // 进入页面后配置 breadCrumb.hide(决定是否展示面包屑)
    let breadCrumbHide = (meta.breadcrumb || {}).hide || false
    if ($store.state.breadCrumb.hide !== breadCrumbHide) {
        $store.commit('$setState', {
            key: 'breadCrumb.hide',
            value: breadCrumbHide,
        })
    }

    // 显示 breadCrumb时,获取 breadCrumb.list
    if ($store.state.breadCrumb.hide) {
        let breadCrumblist
        if ((meta.breadCrumb || {}).list !== undefined) {
            // 获取自定义 breadCrumb.list
            breadCrumblist = meta.breadCrumb.list
        } else {
            // 未配置 breadCrumb.list时,依据path自动获取
            breadCrumblist = $store.getters.getPathBreadCrumb(to)
        }
        $store.commit('$setState', {
            key: 'breadCrumb.list',
            value: breadCrumblist,
        })
    }
})

export default router
```

### 组件导航守卫

```
{
        label: '舆情分析',
        img: 'audio-opinion',
        child: [
            {
                label: '预警看板',
                href: 'earlyWarn/board',
                component: () => import(/* webpackChunkName: "audio-earlyWarn" */ './page/earlyWarn/board/board.vue'),
                beforeEnter: async(to, from, next) => {
                    await getPositionTree()
                    next()
                },
            },
            {
                label: '用户源声',
                href: 'earlyWarn/sourceVoice',
                component: () => import(/* webpackChunkName: "audio-earlyWarn" */ './page/earlyWarn/sourceVoice/sourceVoice.vue'),
                beforeEnter: async(to, from, next) => {
                    await getPositionTree()
                    next()
                },
            },
        ],
    },
```
