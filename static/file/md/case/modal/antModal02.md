```tsx
import React, { useState } from 'react'
import { Button, Modal } from 'antd'

function useModal() {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const showModal = () => {
        setOpen(true)
    }

    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setOpen(false)
        }, 3000)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return { showModal, handleOk, handleCancel, loading, open }
}

const AntModal02: React.FC = () => {
    const { showModal, handleOk, handleCancel, loading, open } = useModal()

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal with customized footer
            </Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
                        Search on Google
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default AntModal02
```
