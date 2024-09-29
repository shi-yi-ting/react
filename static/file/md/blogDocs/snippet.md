### 组件介绍

主要用于代码片段的展示用；组件封装用到`pre`标签，`jq`，以及`syntaxy.light.min.css`样式

### 使用

使用前对Snippet组件进行了全局注册

```
<template>
    <div class="snippet">
        <Snippet :list="snippet.list" />
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup() {
        const snippet = reactive({
            list: [
                {
                    title: 'HTML123',
                    code: `
                        <div>
                            <DatePicker v-model="time.timeRange" range valueType="format" format="YYYY-MM-DD" class="search_control" />
                        </div>
                    `,
                },

                {
                    title: 'JS',
                    code: `
                        const time = reactive({
                            timeRange: [dayjs().subtract(6, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
                            timeDimension: 'day',
                            statisticType: 'number',
                            statisticDimension: 'device_name',
                            statisticItem: [],
                        })
                    `,
                },
            ],
        })

        return {
            snippet,
        }
    },
}
</script>
```
### 效果
