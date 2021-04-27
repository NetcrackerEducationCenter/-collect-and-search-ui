import { Table, Button, Space, Modal, message, Empty, Divider, Row, Col } from 'antd';
import axios from 'axios';
import { config } from '../../../Config';
import { keycloak } from '../../../index';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function Sources(props) {

    let roles = keycloak.tokenParsed.resource_access.ui.roles;

    const handleShow = (action) => {
        props.crud(0, action);
    };

    const handleDelete = (id) => {
        let source = props.sources.map((s) => {
            if (s.id === id) {
                return s;
            }
        })
        axios.post(config.url + '/api/sources/push', {
            action: config.DELETE,
            source
        }).then(res => {
            alert('Successfully deleted!');
        });
        props.showDrawer(false);
    };

    const isAdmin = () => {
        if (roles.includes('UIadminROLE')) {

            return (
                <Row style={{ marginTop: '5%' }}>
                    <Col xs={8} offset={3}>
                        <Button block ghost
                            type='primary'
                            onClick={() => handleShow(config.ADD)}
                        >
                            Add Source
                        </Button>
                    </Col>

                    <Col xs={8} offset={1}>
                        <Button block ghost
                            type='primary'
                            href='https://netcracker-collect-and-search.tk:8443/auth/'
                        >
                            Edit Users
                        </Button>
                    </Col>

                </Row>
            );
        }
    }

    let columns;

    if (Array.isArray(props.sources) && props.sources.length) {

        if (roles.includes('UIadminROLE')) {

            columns = [
                {
                    width: '20%',
                    title: 'Source',
                    dataIndex: 'source',
                    key: 'source',
                    fixed: 'left',
                },
                {
                    width: '20%',
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    fixed: 'right',
                },
                {
                    width: '30%',
                    title: 'Actions',
                    fixed: 'right',
                    key: 'operations',
                    render: (text, record) =>
                        <Space size='middle'>
                            <Button type='primary' ghost onClick={() => {
                                props.crud(record, config.UPDATE);
                            }}> update </Button>
                            <Button
                                danger
                                type='ghost'
                                onClick={() => {
                                    confirm({
                                        title: 'Are you sure delete ' + record.source,
                                        icon: <ExclamationCircleOutlined />,
                                        content: 'Some descriptions',
                                        okText: 'Yes',
                                        okType: 'danger',
                                        cancelText: 'No',
                                        onOk() {
                                            handleDelete(record.source);
                                        },
                                        onCancel() {
                                            message.info('Canceled');
                                        },
                                    });
                                }}
                            >
                                Delete
                        </Button>
                        </Space>

                }
            ];
        } else {
            columns = [
                {
                    title: 'Source',
                    dataIndex: 'source',
                    key: 'source',
                    fixed: 'left',
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    fixed: 'right',
                }
            ];
        }

        const tableData = props.sources.map((s, i) => {
            return {
                key: i,
                source: s.id,
                type: s.sourceType
            }
        });

        return (
            <div >
                <Table columns={columns} dataSource={tableData} scroll={{ x: 200 }} pagination={false} />
                {isAdmin()}
            </div >
        );
    } else return (
        <>
            <Empty />
            <Divider />
            {isAdmin()}
        </>

    );

}

export default Sources;