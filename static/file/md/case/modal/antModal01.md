```tsx
import React, { useState } from 'react'
import { Button, Modal } from 'antd'

function useModal() {
    const [isModalOpen, setIsModalOpen] = useState(false) // 弹窗状态

    // 打开弹窗
    const showModal = () => {
        setIsModalOpen(true)
    }

    // 点击确定
    const handleOk = () => {
        setIsModalOpen(false)
    }

    // 点击取消
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return { isModalOpen, showModal, handleOk, handleCancel }
}

const AntModal01: React.FC = () => {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal()

    return (
        <>
            <div>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="Basic Modal" okText="确认" cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        </>
    )
}

export default AntModal01
```
