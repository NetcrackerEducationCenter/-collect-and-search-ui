import axios from 'axios';
import { config } from '../../../Config';
import React, { useState } from "react";
import { Button, Form, Input, message, Select } from 'antd'
import { Option } from 'antd/lib/mentions';

function AddSource(props) {

    const [sourceType, setSourceType] = useState('JIRA');
    const [validated, setvalidated] = useState(false);
    const [jiraSource, setjiraSource] = useState({});
    const [ftpSource, setftpSource] = useState({});
    const [confSource, setconfSource] = useState({});

    const onFinish = () => {
        addSourceRequest();
        props.form.resetFields();
    }

    const onFinishUpdate = () => {
        setSourceType(props.sourceRecord.type);
        addSourceRequest();
        props.form.resetFields();
    }

    const getCurrentSourceFildes = () => {
        if (props.action === config.UPDATE) {
            if (sourceType === 'JIRA') {
                jiraSource.url = props.sourceRecord.source
                return (
                    <>

                        <Form.Item label='URL' name='jiraURL' rules={[{ required: true, message: 'Please write JIRA URL' }]} >
                            <Input placeholder='enter URL' defaultValue={props.sourceRecord.source} disabled />
                        </Form.Item>

                        <Form.Item label='Login' name='jiraLogin' rules={[{ required: true, message: 'Please write JIRA accaunt\'s login' }]}>
                            <Input placeholder='enter jira accaunts login' onChange={(e) => { jiraSource.login = e.target.value }} />
                        </Form.Item>

                        <Form.Item label='Password' name='jiraPassword' rules={[{ required: true, message: 'Please write JIRA accaunt\'s password' }]} >
                            <Input placeholder='enter password' onChange={(e) => { jiraSource.password = e.target.value }} />
                        </Form.Item>
                    </>
                );
            } else if (sourceType === 'FTP') {
                ftpSource.server = props.sourceRecord.source
                return (
                    <>
                        <Form.Item label='Server' name='ftpServer' rules={[{ required: true, message: 'Please write your FTP server' }]}>
                            <Input placeholder='enter FTP server ip address' defaultValue={props.sourceRecord.source} disabled />
                        </Form.Item>

                        <Form.Item label='Port' name='ftpPort' rules={[{ required: true, message: 'Please write your FTP port' }]} >
                            <Input placeholder='enter port' onChange={(e) => { ftpSource.port = e.target.value }} />
                        </Form.Item>

                        <Form.Item label='Login' name='ftpLogin' rules={[{ required: true, message: 'Please write your FTP login' }]} >
                            <Input placeholder='enter login' onChange={(e) => { ftpSource.login = e.target.value }} />
                        </Form.Item>

                        <Form.Item label='Password' name='ftpPassword' rules={[{ required: true, message: 'Please write your FTP password' }]} >
                            <Input placeholder='enter password' onChange={(e) => { ftpSource.password = e.target.value }} />
                        </Form.Item>
                    </>
                );
            }
        }
        if (sourceType === 'JIRA') {
            return (
                <>
                    <Form.Item label='URL' name='jiraURL' rules={[{ required: true, message: 'Please write JIRA URL' }]} >
                        <Input placeholder='enter URL' onChange={(e) => { jiraSource.id = 'https://' + e.target.value }} addonBefore='https://' />
                    </Form.Item>

                    <Form.Item label='Login' name='jiraLogin' rules={[{ required: true, message: 'Please write JIRA accaunt\'s login' }]}>
                        <Input placeholder='enter jira accaunts login' onChange={(e) => { jiraSource.login = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Password' name='jiraPassword' rules={[{ required: true, message: 'Please write JIRA accaunt\'s password' }]} >
                        <Input placeholder='enter password' onChange={(e) => { jiraSource.password = e.target.value }} />
                    </Form.Item>

                </>
            );
        } else if (sourceType === 'FTP') {
            return (
                <>
                    <Form.Item label='Server' name='ftpServer' rules={[{ required: true, message: 'Please write your FTP server' }]}>
                        <Input placeholder='enter FTP server ip address' onChange={(e) => { ftpSource.id = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Port' name='ftpPort' rules={[{ required: true, message: 'Please write your FTP port' }]} >
                        <Input placeholder='enter port' onChange={(e) => { ftpSource.port = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Login' name='ftpLogin' rules={[{ required: true, message: 'Please write your FTP login' }]} >
                        <Input placeholder='enter login' onChange={(e) => { ftpSource.login = e.target.value }} />
                    </Form.Item>

                    <Form.Item label='Password' name='ftpPassword' rules={[{ required: true, message: 'Please write your FTP password' }]} >
                        <Input placeholder='enter password' onChange={(e) => { ftpSource.password = e.target.value }} />
                    </Form.Item>
                </>
            );
        } else return null;

    }

    const addSourceRequest = () => {
        let msg = {
            action: props.action,
            source: sourceType,
            ftpSource,
            jiraSource,
            confSource
        }
        message.info(JSON.stringify(msg));
        axios.post(`${config.url}/api/sources/push`, msg).then(res => {
            //TODO Написать обработчик или валидацию
            props.showDrawer(false);
        });
    }

    if (props.action === config.ADD) {
        return (
            <Form
                layout='vertical'
                form={props.form}
                name="control-ref"
                onFinish={onFinish}
            >

                <Form.Item label='Source type' name='selector' rules={[{ required: true, message: `Select what kind of source you want to ${props.type}` }]}>
                    <Select
                        defaultValue='JIRA'
                        placeholder="Choose a sources"
                        onChange={(value) => {
                            setSourceType(value);
                        }}
                        allowClear
                    >
                        <Option key='JIRA' >JIRA</Option>
                        <Option key='FTP' >FTP</Option>
                        <Option key='CONFLUENCE' >CONFLUENCE</Option>
                    </Select>
                </Form.Item>

                {getCurrentSourceFildes()}

                <Form.Item>
                    <Button type='primary' htmlType='submit' >Add Source</Button>
                </Form.Item>

            </Form>
        );
    }

    if (props.action === config.UPDATE) {
        return (
            <Form
                layout='vertical'
                form={props.form}
                name="control-ref"
                onFinish={onFinishUpdate}
            >

                <Form.Item label='Source type' rules={[{ required: true, message: `Select what kind of source you want to ${props.action}` }]}>
                    <Select
                        placeholder="Choose a sources"
                        onChange={(value) => {
                            setSourceType(value);
                        }}
                        defaultValue={props.sourceRecord.type}
                        disabled
                    >
                        <Option key='JIRA' >JIRA</Option>
                        <Option key='FTP' >FTP</Option>
                        <Option key='CONFLUENCE' >CONFLUENCE</Option>
                    </Select>
                </Form.Item>

                {getCurrentSourceFildes()}

                <Form.Item>
                    <Button type='primary' htmlType='submit' >Update Source</Button>
                </Form.Item>

            </Form>
        );
    }
}

export default AddSource;