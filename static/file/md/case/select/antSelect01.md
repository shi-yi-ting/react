```jsx
import React, { useEffect, useState } from 'react'
import { Select, Space } from 'antd'


// 自定义下拉框hook
function useOptions() {
    const [list, setList] = useState<any[]>([]) // 下拉框选项数组
    const [selectedValue, setSelectedValue] = useState<any>('lucy') // 选中的值

    const handleChange = (value: string) => {
        // console.log(`selected ${value}`)
        setSelectedValue(value) // 更新选中值为value

        // const selectedOption = list.find(option => option.value === value)
        // if (selectedOption) {
        //     setSelectedValue(selectedOption.label) // 更新选中值为label
        // }
    }

    return { selectedValue, setSelectedValue, list, setList, handleChange }
}

const App: React.FC = () => {
    const { selectedValue, list, setList, handleChange } = useOptions() // 自定义下拉框hook

    useEffect(() => {
        const newList = [
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
        ]
        setList(newList)
    }, []) // 传入空数组依赖  初始执行一次

    // DOM
    return (
        <Space wrap>
            <Select
                value={selectedValue}
                style={{ width: 120 }}
                onChange={handleChange}
                options={list}
            />

            <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                disabled
                options={[{ value: 'lucy', label: 'Lucy' }]}
            />

            <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                loading
                options={[{ value: 'lucy', label: 'Lucy' }]}
            />

            <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                allowClear
                options={[{ value: 'lucy', label: 'Lucy' }]}
            />
        </Space>
    )
}

export default App
```
