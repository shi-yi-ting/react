```jsx
import React from 'react'
import { Space, Button, message } from 'antd'

const AntMessage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        })
    }

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        })
    }

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'This is a warning message',
        })
    }

    const info = () => {
        messageApi.info('Hello, Ant Design!')
    }

    return (
        <>
            {contextHolder}
            <Space>
                <Button onClick={success}>Success</Button>
                <Button onClick={error}>Error</Button>
                <Button onClick={warning}>Warning</Button>
                <Button type="primary" onClick={info}>
                    Display normal message
                </Button>
            </Space>
        </>
    )
}

export default AntMessage
```
