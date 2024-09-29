### 安装依赖

```sh
npm install md-editor-v3
```

### 简单封装

```
<template>
    <div>
        <MdPreview :editorId="id" :modelValue="content" />
    </div>
</template>

<script>
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

export default {
    components: {
        MdPreview,
    },

    props: {
        content: {
            type: String,
        },

        id: {
            type: String,
            dafault: 'preview-only',
        },
    },

    setup() {
        return {}
    },
}
</script>
```

### 使用

```
<template>
    <div class="markDown">
        <Common :title="common.title">
            <MarkDown :content="markDown.content" />
        </Common>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import Common from '../vue/common.vue'
// import markDowns from './docs/markDown.md'

export default {
    components: {
        Common,
    },

    setup() {
        const common = reactive({
            title: {
                mainTitle: '编程技术',
                subTitle: 'vue3中 MarkDown 的使用',
                readTime: '阅读约3分钟',
            },
        })

        const markDown = reactive({
            content: '### Hello Editor',
        })

        onMounted(() => {
            // 获取markDown文件的字符串
            axios('static/file/md/markDown.md').then((resp) => {
                markDown.content = resp.data
            })
        })

        return {
            common,
            markDown,
        }
    },
}
</script>

<style lang="less" scoped>
</style>
```

### 参考了解

[参考连接](https://github.com/imzbf/md-editor-v3)
