```jsx
import { useEffect, useState } from 'react'
import type { PopconfirmProps } from 'antd'
import { Space, Popconfirm, Button, Table, Tag, Divider, Radio, message } from 'antd'

import MarkDownBox from '@/components/common/markDownBox/markDownBox.tsx'

function useTable() {
    // TS
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e)
        message.success('Click on Yes')
      }

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e)
        message.error('Click on No')
    }

    const [table, setTable] = useState({
        loading: false,
        total: 0,
        list: [] as DataType[],
        selectKeys: [],
        columns: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text: string, record: DataType) => <a>{text}</a>,
            },

            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },

            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },

            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: (_: any, { tags }: { tags: any[] }) => (
                    <>
                        {tags.map((tag: any) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green'
                            if (tag === 'loser') {
                                color = 'volcano'
                            }

                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </>
                ),
            },

            {
                title: 'Action',
                key: 'action',
                render: (_: any, record: any) => (
                    <Space size="middle">
                        <a onClick={() => console.log(record)}>Invite {record.name}</a>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ],
    })

    // 获取表格数据
    const getTableList = () => {
        console.log('获取表格数据')

        try {
            const params = {
                current: page.defaultCurrent,
                pageSize: page.defaultPageSize,
                // xxx
            }

            console.log('params.current', params.current)
            console.log('params.pageSize', params.pageSize)

            setTable({
                ...table,
                loading: true,
                total: 0,
                list: [],
            })

            // const resp = await getTableListApi(params)
            // console.log(resp.data)
            // table.total = resp.data?.total
            // table.list = resp.data.map((item) => {
            //     return {
            //         id: item.id,
            //         stationName: item.stationName,
            //     }
            // })

            setTable({
                ...table,
                loading: false,
                list: [
                    {
                        key: '1',
                        name: 'John Brown',
                        age: 32,
                        address: 'New York No. 1 Lake Park',
                        tags: ['nice', 'developer'],
                    },

                    {
                        key: '2',
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 1 Lake Park',
                        tags: ['loser'],
                    },

                    {
                        key: '3',
                        name: 'Joe Black',
                        age: 32,
                        address: 'Sydney No. 1 Lake Park',
                        tags: ['cool', 'teacher'],
                    },
                ]
            })
        } catch (err) {
            console.error(err)
        }
    }


    // 分页
    const page = {
        defaultCurrent: 1, // 默认当前页
        defaultPageSize: 2, // 默认每页显示条数

        pageSizeOptions: ['1', '2', '10', '40'], // 每页显示条数选项
        showSizeChanger: true, // 显示条数选择器

        showQuickJumper: true, // 快速跳转

        locale: {
            items_per_page: '条/页',
            jump_to: '跳至',
            page: '页',
        },

        onChange: (pageIndex: any, pageSize: any) => {
            page.defaultCurrent = pageIndex
            page.defaultPageSize = pageSize

            getTableList()
        },
    }


    // 复选框
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },

        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }


    return { table, page, selectionType, setSelectionType, rowSelection, getTableList }
}

// DOM
const AntTable = () => {
    const { table, page, selectionType, setSelectionType, rowSelection, getTableList } = useTable() // 表格数据

    // 传入空数组依赖  初始执行一次
    useEffect(() => {
        getTableList()
    }, [])


    return (
        <div className="common_container">
            <div className="mt10">
                <MarkDownBox url={ 'static/file/md/case/table/antTable.md' }>
                    <div>
                        <div>
                            <span className="ft20 fw700 mr8">AntTable</span>
                            <div>表格基础使用，带复选框，带分页，带操作列</div>
                        </div>

                        <div className="mt15">
                            <Radio.Group
                                onChange={({ target: { value } }) => {
                                    setSelectionType(value)
                                }}
                                value={selectionType}
                            >
                                <Radio value="checkbox">Checkbox</Radio>
                                <Radio value="radio">radio</Radio>
                            </Radio.Group>

                            <Divider />

                            <Table
                                dataSource={table.list}
                                columns={table.columns}
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }}
                                pagination={{
                                    ...page
                                }}
                            />
                        </div>
                    </div>
                </MarkDownBox>
            </div>
        </div>
    )
}

export default AntTable

```
