// Logos
import logo from '../assets/logo192.png';
import userLogo from '../assets/user-logo.png';
import { LogoutOutlined } from '@ant-design/icons';

// Pages
import Home from '../Pages/Home';
import History from '../Pages/History';
import Profile from '../Pages/Profile';
import WorkPage from '../Pages/WorkPage';
import axios from "axios";

// CSS
// import '../css/Layout.css';

// Vars
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import StatusButton from '../Components/StatusButton';
import ModalRequests from './ModalRequests';
import { config } from '../Config.js';
import { keycloak, webSocket } from "../index";
import { Button, Modal, Form, message } from "antd";
import AddSearch from './ForWorkpage/AddSearch';
import StatusTable from './StatusTable';
import Text from 'antd/lib/typography/Text';

function HeaderFunc(props) {

    const [modalActive, setModalActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reqStatuses, setReqStatuses] = useState([]);
    const [sources, setSources] = useState([]);
    const [modalEmpty, setModalEmpty] = useState(true);
    const [report, setReport] = useState('');
    const [reqId, setReqId] = useState('');
    const [form] = Form.useForm();


    const MINUTE_MS = 10000;




    useEffect(() => {
        webSocket.send(JSON.stringify({ give: 'statuses' }));

        getRequestStatuses();
        getSources();
        const interval = setInterval(() => {
            getRequestStatuses();
            getSources();

        }, MINUTE_MS);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const getSources = async () => {
        axios.post(config.url + '/api/sources/get').then(res => {
            console.log(JSON.stringify(res.data));
            setSources(res.data);
        })
    }





    const getRequestStatuses = async () => {
        axios.post(`${config.url}/api/status/get`).then((res) => {
            console.log('getRequestStatuses(): ' + JSON.parse(JSON.stringify(res.data)));
            let st = JSON.parse(JSON.stringify(res.data));
            setReqStatuses(st.reverse());
            setModalEmpty(false);
        });
    }


    const changeState = () => {
        if (modalActive) {
            setModalActive(false);
        } else {
            setModalActive(true);
        }
    }

    const setActive = (activeted) => {
        setModalActive(activeted);
    }

    return (
        <div>
            <Navbar expand="md" bg="dark" variant="dark"> {/* foxed='top' */}
                <Container>

                    <Navbar.Brand>
                        <Link to='/'>

                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            /><Text style={{ color: 'white' }}>Collect and Search</Text>
                        </Link>
                    </Navbar.Brand>

                    <Nav className="mr-auto">
                    </Nav>

                    <Button ghost
                        style={{
                            color: "rgb(126, 254, 57)",
                            borderColor: "rgb(126, 254, 57)",
                            marginRight: '2%'
                        }}
                        onClick={() => setIsModalVisible(true)} >
                        New request
                    </Button>

                    <Button ghost onClick={changeState} >
                        Requestes
                    </Button>

                    <Button variant="outline-info" className='bg-transparent border-0' >
                        <Link to='/profile'>

                            <img
                                src={userLogo}
                                alt="user"
                                height="30"
                                width="30"
                            />
                        </Link>
                    </Button>

                    <Button danger type='primary' ghost
                        onClick={() => keycloak.logout()}
                    // icon={<LogoutOutlined />}
                    >
                        Log Out
                    </Button>

                </Container>
            </Navbar>


            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/history" component={History} />
                <Route exact path="/profile" render={(props) =>
                    <Profile
                        {...props}
                        report={report}
                        statuses={reqStatuses}
                        requestId={reqId}
                        // setRequestId={getReport}
                        sources={sources}
                    />
                }

                />
                <Route exact path="/workpage/:requestId" render={(props) =>
                    <WorkPage
                        {...props}
                        report={report}
                        statuses={reqStatuses}
                        requestId={reqId}
                        // setRequestId={getReport}
                        sources={sources}
                    />
                }
                />
            </Switch>



            <AddSearch
                form={form}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}

            />

            <Modal
                width='70%'
                title='Last requestes'
                visible={modalActive}
                footer={false}
                onCancel={() => setModalActive(false)}
            >
                <StatusTable {...props}
                    pageSize='5'
                    size='small'
                    statuses={reqStatuses}
                />
            </Modal>
        </div>
    );
}

export default HeaderFunc;