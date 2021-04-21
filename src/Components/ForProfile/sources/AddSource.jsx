import axios from 'axios';
import { config } from '../../../Config';
import React, { useState } from "react";
import { Button, Form, Input, message, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal';

function AddSource(props) {
    let source = '';
    // if (props.action === config.UPDATE) {
    //     source = props.sourceRecord.type.toUpperCase();
    // }

    const [sourceType, setSourceType] = useState(source);

    // const [sourceType, setSourceType] = useState(props.sourceRecord.type.toUpperCase());
    const [credentials, setcredentials] = useState({});
    const [form] = Form.useForm();

    const onFinish = () => {
        let formData = form.getFieldsValue();
        addSourceRequest(formData);
        onClose();
        // props.form.resetFields();
    }

    const onFinishUpdate = () => {
        setSourceType(props.sourceRecord.type.toUpperCase());
        addSourceRequest();
        // props.form.resetFields();
        onClose();
    }

    const getCurrentSourceFildes = () => {

        if (props.action === config.UPDATE) {
            // setSourceType(props.sourceRecord.type.toUpperCase());
            let sourceType = props.sourceRecord.type.toUpperCase();
            if (sourceType === 'JIRA') {
                credentials.url = props.sourceRecord.source
                return (
                    <>

                        <Form.Item label='URL' name='url' >
                            <Input placeholder='enter URL' />
                        </Form.Item>

                        <Form.Item label='Login' name='login' rules={[{ required: true, message: 'Please write JIRA accaunt\'s login' }]}>
                            <Input placeholder='enter jira accaunts login' onChange={(e) => { credentials.login = e.target.value }} />
                        </Form.Item>

                        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please write JIRA accaunt\'s password' }]} >
                            <Input placeholder='enter password' onChange={(e) => { credentials.password = e.target.value }} />
                        </Form.Item>
                    </>
                );
            } else if (sourceType === 'FTP') {
                credentials.server = props.sourceRecord.source
                return (
                    <>
                        <Form.Item label='Server' name='server'>
                            <Input placeholder='enter FTP server ip address' />
                        </Form.Item>

                        <Form.Item label='Port' name='port' rules={[{ required: true, message: 'Please write your FTP port' }]} >
                            <Input placeholder='enter port' onChange={(e) => { credentials.port = e.target.value }} />
                        </Form.Item>

                        <Form.Item label='Login' name='login' rules={[{ required: true, message: 'Please write your FTP login' }]} >
                            <Input placeholder='enter login' onChange={(e) => { credentials.login = e.target.value }} />
                        </Form.Item>

                        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please write your FTP password' }]} >
                            <Input placeholder='enter password' onChange={(e) => { credentials.password = e.target.value }} />
                        </Form.Item>
                    </>
                );
            } else if (sourceType === 'CONFLUENCE') {
                credentials.url = props.sourceRecord.source
                return (
                    <>
                        <Form.Item label='URL' name='url'>
                            <Input placeholder='enter URL' />
                        </Form.Item>

                        <Form.Item label='Token' name='token' rules={[{ required: true, message: 'Please write your Confluence token' }]}>
                            <Input placeholder='enter Confluence token' onChange={(e) => { credentials.password = e.target.value }} />
                        </Form.Item>
                    </>
                );
            }
        }
        if (sourceType === 'JIRA') {
            return (
                <>
                    <Form.Item label='URL' name='url' rules={[{ required: true, message: 'Please write JIRA URL' }]} >
                        <Input placeholder='enter URL' onChange={(e) => { credentials.url = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Login' name='login' rules={[{ required: true, message: 'Please write JIRA accaunt\'s login' }]}>
                        <Input placeholder='enter jira accaunts login' onChange={(e) => { credentials.login = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please write JIRA accaunt\'s password' }]} >
                        <Input placeholder='enter password' onChange={(e) => { credentials.password = e.target.value }} />
                    </Form.Item>

                </>
            );
        } else if (sourceType === 'FTP') {
            return (
                <>
                    <Form.Item label='Server' name='server' rules={[{ required: true, message: 'Please write your FTP server' }]}>
                        <Input placeholder='enter FTP server ip address' onChange={(e) => { credentials.server = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Port' name='port' rules={[{ required: true, message: 'Please write your FTP port' }]} >
                        <Input placeholder='enter port' onChange={(e) => { credentials.port = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Login' name='login' rules={[{ required: true, message: 'Please write your FTP login' }]} >
                        <Input placeholder='enter login' onChange={(e) => { credentials.login = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please write your FTP password' }]} >
                        <Input placeholder='enter password' onChange={(e) => { credentials.password = e.target.value }} />
                    </Form.Item>
                </>
            );
        } else if (sourceType === 'CONFLUENCE') {
            return (
                <>
                    <Form.Item label='URL' name='url' rules={[{ required: true, message: 'Please write Confluence URL' }]} >
                        <Input placeholder='enter URL' onChange={(e) => { credentials.url = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Token' name='token' rules={[{ required: true, message: 'Please write your Confluence token' }]}
                        onChange={(e) => { credentials.id = 'https://' + e.target.value }}
                    >
                        <Input placeholder='enter Confluence token' />
                    </Form.Item>
                </>
            );
        } else return null;

    }

    const onClose = () => {
        setSourceType('');
        setcredentials({});
        form.resetFields();
        props.setShowModal(false);


        // props.setSourceRecord({});
    }

    const addSourceRequest = (formData) => {
        let msg;
        if (props.action === config.ADD) {
            msg = {
                action: props.action,
                source: sourceType.toUpperCase(),
                credentials: {
                    url: 'https://' + formData.url,
                    server: formData.server,
                    port: formData.port,
                    login: formData.login,
                    password: formData.password,
                    token: formData.token
                }
            }
        } else {
            msg = {
                action: props.action,
                source: props.sourceRecord.type.toUpperCase(),
                credentials: {
                    url: 'https://' + formData.url,
                    server: formData.server,
                    port: formData.port,
                    login: formData.login,
                    password: formData.password,
                    token: formData.token
                }
            }
        }
        message.info(JSON.stringify(msg));
        axios.post(`${config.url}/api/sources/push`, msg).then(res => {
            //TODO Написать обработчик или валидацию
        });

    }

    if (props.action === config.ADD) {
        return (
            <Modal
                title="Create a new source"
                width='70%'
                centered
                onCancel={onClose}
                visible={props.showModal}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout='vertical'
                    form={form}
                    name="control-ref"
                    onFinish={onFinish}
                >

                    <Form.Item label='Source type' name='selector' rules={[{ required: true, message: `Select what kind of source you want to ${props.action}` }]}>
                        <Select
                            placeholder="Choose a sources"
                            onChange={(value) => {
                                setSourceType(value);
                            }}
                            allowClear
                        >
                            <Select.Option value='JIRA' >JIRA</Select.Option>
                            <Select.Option value='FTP' >FTP</Select.Option>
                            <Select.Option value='CONFLUENCE' >CONFLUENCE</Select.Option>
                        </Select>
                    </Form.Item>

                    {getCurrentSourceFildes()}

                    <Form.Item>
                        <Button type='primary' htmlType='submit' >Add Source</Button>
                    </Form.Item>

                </Form>
            </Modal>
        );
    }

    if (props.action === config.UPDATE) {
        return (
            <Modal
                title="Create a new source"
                width='70%'
                centered
                onCancel={onClose}
                visible={props.showModal}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout='vertical'
                    form={form}
                    name="control-ref"
                    onFinish={onFinishUpdate}
                    initialValues={{
                        selector: props.sourceRecord.type.toUpperCase(),
                        url: props.sourceRecord.source,
                        server: props.sourceRecord.source
                    }}
                >

                    <Form.Item label='Source type' name='selector'>
                        <Select
                            placeholder="Choose a sources"
                            onChange={(value) => {
                                message.info(value);
                            }}
                            disabled
                        >
                            <Select.Option value='JIRA' >JIRA</Select.Option>
                            <Select.Option value='FTP' >FTP</Select.Option>
                            <Select.Option value='CONFLUENCE' >CONFLUENCE</Select.Option>
                        </Select>
                    </Form.Item>

                    {getCurrentSourceFildes()}

                    <Form.Item>
                        <Button type='primary' htmlType='submit' >Update Source</Button>
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}


export default AddSource;