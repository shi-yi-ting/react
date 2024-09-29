```tsx
import React, { useState } from 'react'
import { Checkbox, Divider } from 'antd'
import type { CheckboxProps } from 'antd'

const CheckboxGroup = Checkbox.Group

// custom hook
function useCheckBox() {
    const plainOptions = ['Apple', 'Pear', 'Orange']
    const defaultCheckedList = ['Apple', 'Orange']

    const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList)

    const checkAll = plainOptions.length === checkedList.length // check all or not
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length // check some or not

    const onChange = (list: string[]) => {
        setCheckedList(list)
    }

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : [])
    }

    return { plainOptions, checkedList, onChange, onCheckAllChange, checkAll, indeterminate }
}

// component
const App: React.FC = () => {
    const { plainOptions, checkedList, onChange, onCheckAllChange, checkAll, indeterminate } = useCheckBox()

    return (
        <>
            <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={onCheckAllChange}>
                Check all
            </Checkbox>

            <Divider />

            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </>
    )
}

export default App
```
