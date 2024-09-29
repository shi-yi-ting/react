```tsx
import React from 'react'
import { Tooltip, Button } from 'antd'

const AntTooltip01: React.FC = () => {
    return (
        <>
            <Tooltip title="prompt text">
                <Button>Tooltip will show on mouse enter.</Button>
            </Tooltip>

            <Tooltip
                title={
                    <div className="text-overflow" style={{ color: '#fff' }}>
                        title中使用DOM
                    </div>
                }
            >
                <Button>Tooltip will show on mouse enter.</Button>
            </Tooltip>
        </>
    )
}

export default AntTooltip01
```
