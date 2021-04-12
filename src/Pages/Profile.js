import React, { useState } from 'react';
import Avatar from '../Components/ForProfile/Avatar';
import UserInfo from '../Components/ForProfile/UserInfo';
import Users from '../Components/ForProfile/Users';

import { Container } from 'react-bootstrap';
import { Button, Col, Drawer, Form, message, Row } from 'antd';
import AddSourceModal from '../Components/ForProfile/sources/AddSourceModal';
import Sources from '../Components/ForProfile/sources/Sources';
import AddSource from '../Components/ForProfile/sources/AddSource';
import { config } from '../Config';

function Profile(props) {

    const [showDrawer, setShowDrawer] = useState(false);
    const [action, setAction] = useState(config.ADD);
    const [sourceRecord, setSourceRecord] = useState({});
    const [form] = Form.useForm();


    const crud = (record, action) => {
        message.info('CRUD operation >> ' + action);

        if (action === config.ADD) {
            setShowDrawer(true);
            setAction(action);
        } else {
            setShowDrawer(true);
            setAction(action);
            setSourceRecord(record);
        }
    }

    const onClose = () => {
        form.resetFields();
        setShowDrawer(false);
    }

    const doRequest = (action, id) => {

    }

    return (
        < >

            <Row >
                <Col sm={12} xs={24} style={{ backgroundColor: 'blueviolet' }}>
                    <UserInfo />
                </Col >

                {/* <Col md={12}>
                    <Avatar />
                </Col> */}


                <Col sm={12} xs={24} style={{ backgroundColor: 'blue' }} >
                    <Sources {...props} showDrawer={setShowDrawer} crud={crud} />
                </Col>
            </Row>

            {/* <AddSourceModal
                type={type}
                show={showModal}
                onHide={() => setShowModal(false)}

            /> */}

            <Drawer
                title="Create a new source"
                width='70%'
                onClose={onClose}
                visible={showDrawer}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <AddSource
                    form={form}
                    showDrawer={setShowDrawer}
                    action={action}
                    sourceRecord={sourceRecord}
                    doRequest={doRequest}
                />
            </Drawer>
        </>
    );
}

export default Profile;
