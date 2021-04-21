import React, { useState } from 'react';
import UserInfo from '../Components/ForProfile/UserInfo';
// Icons
import { HistoryOutlined, SlidersOutlined } from '@ant-design/icons';

import { Button, Col, Form, message, Row, Tabs } from 'antd';
import Sources from '../Components/ForProfile/sources/Sources';
import AddSource from '../Components/ForProfile/sources/AddSource';
import { config } from '../Config';
import Modal from 'antd/lib/modal/Modal';
import { Content } from 'antd/lib/layout/layout';
import StatusTable from '../Components/StatusTable';


const { TabPane } = Tabs;

function Profile(props) {

    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState(config.ADD);
    const [sourceRecord, setSourceRecord] = useState({});

    const crud = (record, action) => {
        message.info('CRUD operation >> ' + action);

        if (action === config.ADD) {
            setShowModal(true);
            setAction(action);
        } else {
            setSourceRecord(record);
            setAction(action);
            setShowModal(true);
        }
        // setSourceRecord({});
    }

    return (
        <Content
            style={{
                marginTop: '3%',
                marginLeft: '10%',
                marginRight: '10%',
                fontFamily: 'Comfortaa, cursive'
            }}
        >
            <Tabs
                defaultActiveKey='general'
                tabPosition='left'
                style={{ height: '100%' }}
            >

                <TabPane tab={<span>
                    <SlidersOutlined />
          General info
        </span>} key='general'>
                    <Row >
                        <Col xl={12} md={24} style={{ backgroundColor: '' }}>
                            <UserInfo />
                        </Col >

                        <Col xl={12} md={24} style={{ backgroundColor: '' }} >
                            <Sources {...props} showDrawer={setShowModal} crud={crud} />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab={<span><HistoryOutlined />Request history</span>} key='history'>
                    <StatusTable
                        // size='default'
                        statuses={props.statuses}
                        requestId={props.requestId}
                        // setRequestId={props.setRequestId}
                    />
                </TabPane>

            </Tabs>

            {/* <AddSourceModal
                type={type}
                show={showModal}
                onHide={() => setShowModal(false)}

            /> */}


            <AddSource
                setSourceRecord={setSourceRecord}
                setShowModal={setShowModal}
                showModal={showModal}
                action={action}
                sourceRecord={sourceRecord}
            />
        </Content>
    );
}

export default Profile;
