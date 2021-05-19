import React, { useState } from 'react'
import { Table, Input, Button, Space, Tag, Badge, Empty } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';

function StatusTable(props) {

    const [searchedColumn, setsearchedColumn] = useState('');
    const [searchText, setsearchText] = useState('');

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
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

    if (Array.isArray(props.statuses) && props.statuses.length) {

        console.log(props.statuses);

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
                            <Tag color="#87d068" style={{ cursor: 'pointer' }} onClick={() => props.getReport(record.request, 'first')}><Link to={`/workpage`} >{record.status}</Link></Tag>
                        );
                    } else if (record.status === 'RESTORED') {
                        return (
                            <Tag color="#108ee9"style={{ cursor: 'pointer' }} onClick={() => props.getReport(record.request, 'first')}><Link to={`/workpage`} >{record.status}</Link></Tag>
                        );
                    } else {
                        return (
                            <Tag color="#c2be4a">IN PROGRESS</Tag>
                        );
                    }
                }
            },
        ];


        const tableData = props.statuses.map((s, i) => {
            return {
                key: i,
                request: s.requestId,
                status: s.status,
                keywords: s.keywords.map((v, i) => { return v + ' ' }),
                date: s.date
            }
        })

        return <Table pagination={{ pageSize: props.pageSize, hideOnSinglePage: true, position: ['bottomCenter'] }} size={props.size} scroll={{ x: 500 }} columns={columns} dataSource={tableData} />
    } else {
        return <Empty description="No statuses" />
    }
}

export default StatusTable;
