import axios from 'axios';
import { config } from '../../../Config';
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function AddSource(props) {

    const [sourceType, setSourceType] = useState('JIRA');
    const [validated, setvalidated] = useState(false);
    const [jiraSource, setjiraSource] = useState({});
    const [ftpSource, setftpSource] = useState({})

    //JIRA data
    // let jiraSource = {
    //     login: '',
    //     password: '',
    //     url: ''
    // };

    // //FTP data
    // let ftpSource = {
    //     port: '',
    //     server: '',
    //     login: '',
    //     password: ''
    // };

    const getCurrentSourceFildes = () => {

        if (sourceType === 'JIRA') {
            return (
                <>
                    <Form.Group>
                        <Form.Label>Login</Form.Label>
                        <Form.Control type='text' placeholder='Login' required
                            onChange={(e) => { jiraSource.login = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write JIRA accaunt's login
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='text' required placeholder='Password'
                            onChange={(e) => { jiraSource.password = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write JIRA accaunt's password
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>URL</Form.Label>
                        <Form.Control type='text' required placeholder='URL'
                            onChange={(e) => { jiraSource.url = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write your JIRA url
                        </Form.Control.Feedback>
                    </Form.Group>
                </>
            );
        } else if (sourceType === 'FTP') {
            return (
                <>

                    <Form.Group>
                        <Form.Label>Server</Form.Label>
                        <Form.Control type='text' required placeholder='Server'
                            onChange={(e) => { ftpSource.server = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write your FTP server
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Port</Form.Label>
                        <Form.Control type='text' required placeholder='Port'
                            onChange={(e) => { ftpSource.port = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write your FTP server port
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Login</Form.Label>
                        <Form.Control type='text' required placeholder='Login'
                            onChange={(e) => { ftpSource.login = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write your FTP accaunt login
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='text' required placeholder='Password'
                            onChange={(e) => { ftpSource.password = e.target.value }}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please write your FTP accaunt password
                        </Form.Control.Feedback>
                    </Form.Group>

                </>
            );
        } else return null;
    }

    const validation = (event) => {
        console.log(`jiraSource `, jiraSource)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            // return null;
            // event.stopPropagation();
        } else {
            addSourceRequest();
            props.onHide();
        }

        setvalidated(true);


    }

    const addSourceRequest = () => {
        axios.post(`${config.url}/api/sources/push`, {
            ftpSource,
            jiraSource
        }).then(res => {
            //TODO Написать обработчик или валидацию
        });
    }

    return (
        <Form noValidate validated={validated} onSubmit={validation}>

            <Form.Group>
                <Form.Label>Source type</Form.Label>
                <Form.Control
                    as='select'
                    onChange={e => {
                        setSourceType(e.target.value);
                    }}
                >
                    <option >JIRA</option>
                    <option >FTP</option>
                </Form.Control>
                <Form.Text className='text-muted'>
                    Select what kind of source you want to add
                    </Form.Text>
            </Form.Group>

            <Form.Group>
                {getCurrentSourceFildes()}
            </Form.Group>

            <Form.Group>
                <Button type='submit'>Add Source</Button>
            </Form.Group>

        </Form>
    );
}

export default AddSource;