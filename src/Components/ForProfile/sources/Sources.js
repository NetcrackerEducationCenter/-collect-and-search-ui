import { Table, Button, Space, Modal, message, Empty, Divider, Row, Col } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { config } from '../../../Config';
import { keycloak } from '../../../index';

import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddSource from './AddSource';

const { confirm } = Modal;

function Sources(props) {

    let roles = keycloak.tokenParsed.resource_access.ui.roles;

    const handleShow = (action) => {
        props.crud(0, action);
        // setcurrentid(id);
    };

    const handleDelete = (id) => {
        axios.post(config.url + '/api/sources/push', {
            action: config.DELETE,
            id
        }).then(res => {
            alert('Successfully deleted!');
        });
        props.showDrawer(false);
    };

    const isAdmin = () => {
        if (roles.includes('UIadminROLE')) {
            return (
                <Row>
                    <Col xs={8} offset={4}>
                        <Button
                            block
                            type='primary'
                            ghost
                        //     onClick={() => props.crud('add')}
                            onClick={()=>handleShow(config.ADD)}
                        >
                            <PlusOutlined />Add Source
                        </Button>
                    </Col>

                    <Col xs={8} >
                        <Button
                            block
                            type='primary'
                            ghost
                            href='https://netcracker-collect-and-search.tk:8443/auth/'
                        >
                            Edit Users
                        </Button>
                    </Col>
                    
                </Row>
            );
        }
    }

    console.log(roles.includes('UIadminROLE')+' !!!!!!!!!!!');

    if (Array.isArray(props.sources) && props.sources.length) {

        const columns = [
            {
                title: 'Source',
                dataIndex: 'source',
                width: 100,
                key: 'source',
                fixed: 'left',
            },
            {
                title: 'Type',
                width: 250,
                dataIndex: 'type',
                key: 'type',
                fixed: 'left',
            },
            {
                title: 'Actions',
                width: 20,
                fixed: 'right',
                key: 'operations',
                render: (text, record) =>
                    <Space size='middle'>
                        <Button type='primary' onClick={()=>{
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

        const tableData = props.sources.map((s, i) => {
            return {
                key: i,
                source: s.credentials.id,
                type: s.source
            }
        });

        return (
            <div >
                <Table columns={columns} dataSource={tableData} pagination={false} />
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