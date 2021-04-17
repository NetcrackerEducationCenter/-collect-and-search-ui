import React, { useState } from 'react';
import UserInfo from '../Components/ForProfile/UserInfo';

import { Button, Col, Form, message, Row } from 'antd';
import Sources from '../Components/ForProfile/sources/Sources';
import AddSource from '../Components/ForProfile/sources/AddSource';
import { config } from '../Config';
import Modal from 'antd/lib/modal/Modal';
import { Content } from 'antd/lib/layout/layout';

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
        <Content
            style={{
                marginTop: '3%',
                marginLeft: '10%',
                marginRight: '10%',
                fontFamily: 'Geneva, Arial, Helvetica, sans-serif'
            }}
        >

            <Row >
                <Col sm={12} xs={24} style={{ backgroundColor: '' }}>
                    <UserInfo />
                </Col >

                {/* <Col md={12}>
                    <Avatar />
                </Col> */}


                <Col sm={12} xs={24} style={{ backgroundColor: '' }} >
                    <Sources {...props} showDrawer={setShowDrawer} crud={crud} />
                </Col>
            </Row>

            {/* <AddSourceModal
                type={type}
                show={showModal}
                onHide={() => setShowModal(false)}

            /> */}

            <Modal
                title="Create a new source"
                width='70%'
                centered
                onCancel={onClose}
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
            </Modal>
        </Content>
    );
}

export default Profile;
