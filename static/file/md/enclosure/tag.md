## Tag 封装组件的使用

```js
import tagImg from './_img/help.png'
import MyTag from './_ts/tag'

const Tag = () => {
    return (
        <div className="mt10">
            <MyTag tagImg={tagImg}>
                <span>标题</span>
            </MyTag>
        </div>
    )
}

export default Tag
```

## 封装 Tag 组件

```js
import React from 'react'
import './tag.css'

interface TagProps {
    fontColor?: string // 带问号变为可选属性
    bgColor?: string
    borderColor?: string
    tagImg?: string // Assuming tagImg is a string (URL of the image)
    children: React.ReactNode // 不带问好表示必填属性
}

const Tag: React.FC<TagProps> = ({
    fontColor = '#666', // 设置默认值
    bgColor,
    borderColor,
    tagImg,
    children,
}) => {
    const contentStyle = {
        color: fontColor,
        backgroundColor: bgColor ?? undefined,
        lineHeight: borderColor ? '20px' : '22px',
        border: borderColor ? `1px solid ${borderColor}` : undefined,
        borderRight: borderColor ? '0' : undefined,
    }

    const imgStyle = {
        backgroundImage: tagImg ? `url(${tagImg})` : undefined,
        top: borderColor ? '-1px' : undefined,
    }

    return (
        <span className="tag">
            <span style={contentStyle} className="content">
                {children}
                {tagImg && <i style={imgStyle} className="img" />}
            </span>
        </span>
    )
}

export default Tag
```

## tag.css

```css
.tag {
    display: inline-block;
    height: 22px;
    line-height: 0;
    vertical-align: middle;
}
.tag .content {
    display: inline-block;
    position: relative;
    height: 22px;
    padding: 0 2px 0 10px;
    margin-right: 20px;
    font-size: 13px;
}
.tag .content .img {
    position: absolute;
    right: -20px;
    width: 20px;
    height: 22px;
    background-repeat: no-repeat;
}
```
