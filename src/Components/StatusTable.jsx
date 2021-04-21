import React, { useState } from 'react'
import { Table, Input, Button, Space, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';

function StatusTable(props) {

    const statusList = ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED'];

    const [active, setactive] = useState(0);
    const [searchedColumn, setsearchedColumn] = useState('');
    const [searchText, setsearchText] = useState('');
    let searchInput;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        ghost
                    >
                        Search
              </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setsearchText(selectedKeys[0]);
                            setsearchedColumn(dataIndex);
                        }}
                    >
                        Filter
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        // onFilterDropdownVisibleChange: visible => {
        //     if (visible) {
        //         setTimeout(() => searchInput.select(), 100);
        //     }
        // },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setsearchText(selectedKeys[0]);
        setsearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setsearchText('');
    };


    const columns = [
        {
            width: 150,
            title: 'Request',
            dataIndex: 'request',
            key: 'request'
        },
        {
            width: 150,
            title: 'Keywords',
            dataIndex: 'keywords',
            key: 'keywords',
            ...getColumnSearchProps('keywords'),
            render: (text, record) => <Text>{record.keywords}</Text>
        },
        {
            width: 150,
            title: 'Added date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            width: 150,
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                if (record.status === 'COMPLETED') {
                    return (
                        <Tag color='green'><Link to={`/workpage/${record.request}`} >{record.status}</Link></Tag>
                    );
                } else {
                    return <Tag color='blue'>{record.status}</Tag>
                }
            }
        },
    ];

    const tableData = props.statuses.map((s, i) => {
        return {
            key: i,
            request: s.message.requestId,
            status: s.message.status,
            keywords: s.message.keywords.map((v, i) => { return v + ' ' }),
            date: s.message.date
        }
    })

    return <Table pagination={{ pageSize: props.pageSize, hideOnSinglePage: true, position: ['bottomCenter'] }} size={props.size} scroll={{ x: 500 }} columns={columns} dataSource={tableData} />
}

export default StatusTable;
