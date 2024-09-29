```tsx
import React from 'react'
import { Button, Modal, Space } from 'antd'

function useModal() {
    const info = () => {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() {},
        })
    }

    const success = () => {
        Modal.success({
            content: 'some messages...some messages...',
        })
    }

    const error = () => {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
        })
    }

    const warning = () => {
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
        })
    }

    return { info, success, error, warning }
}

const AntModal03: React.FC = () => {
    const { info, success, error, warning } = useModal()

    return (
        <Space wrap>
            <Button onClick={info}>Info</Button>
            <Button onClick={success}>Success</Button>
            <Button onClick={error}>Error</Button>
            <Button onClick={warning}>Warning</Button>
        </Space>
    )
}

export default AntModal03
```
