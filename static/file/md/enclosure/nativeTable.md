## 原生表格封装

```js
import './nativeTable.scss'

function useTable() {
    const columns = ['错误码', '详情']
    const list = [
        {
            errorCode: '参数规则错误',
            datails: '参数值缺失',
        },
        {
            errorCode: '参数规则错误',
            datails: '参数值缺失',
        },
        {
            errorCode: '参数规则错误',
            datails: '参数值缺失',
        },
    ]

    return { columns, list }
}

const NativeTable = () => {
    const { columns, list } = useTable()

    return (
        <div>
            <div className="mb15">原生表格</div>
            <div id="pdfBox" className="mt10">
                <div className="mt10">
                    <table className="lightTable">
                        <thead>
                            <tr>
                                {columns.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {list.map((row, indexTwo) => (
                                <tr key={indexTwo}>
                                    <td>{row.errorCode}</td>
                                    <td>{row.datails}</td>
                                </tr>
                            ))}
                            <tr>
                                <span className="orderFlag"></span>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default NativeTable
```

## nativeTable.scss 文件内容

```scss
.lightTable {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    color: #d1d6dd;
}
.lightTable th {
    padding: 8px;
    border: 1px solid #2d374e;
    background: #303a52;
}
.lightTable tr {
    height: 48px;
    line-height: 48px;
}
.lightTable td {
    padding: 8px;
    border: 1px solid #2d374e;
    background: #3a4562;
}

/* 字节画圆圈 */
.lightTable tr .orderFlag {
    position: absolute;
    width: 14px;
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    color: #c1c7d0;
    border-radius: 50%;
    background-color: #f30;
}
```
