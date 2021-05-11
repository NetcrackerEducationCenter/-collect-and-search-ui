// Icons
import { HistoryOutlined, SlidersOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import UserInfo from '../Components/ForProfile/UserInfo';
import { Col, message, Row, Tabs } from 'antd';
import Sources from '../Components/ForProfile/sources/Sources';
import AddSource from '../Components/ForProfile/sources/AddSource';
import { config } from '../Config';
import { Content } from 'antd/lib/layout/layout';
import StatusTable from '../Components/StatusTable';


const { TabPane } = Tabs;

function Profile(props) {

    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState(config.ADD);
    const [sourceRecord, setSourceRecord] = useState({});

    const crud = (record, action) => {

        if (action === config.ADD) {
            setShowModal(true);
            setAction(action);
        } else {
            setSourceRecord(record);
            setAction(action);
            setShowModal(true);
        }
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
                        <Col xl={10} md={24} style={{ backgroundColor: '' }}>
                            <UserInfo />
                        </Col >

                        <Col xl={14} md={24} style={{ backgroundColor: '' }} >
                            <Sources {...props} showDrawer={setShowModal} crud={crud} />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab={<span><HistoryOutlined />Request history</span>} key='history'>
                    <StatusTable
                        statuses={props.statuses}
                        requestId={props.requestId}
                        getReport={props.getReport}
                    />
                </TabPane>

            </Tabs>

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
