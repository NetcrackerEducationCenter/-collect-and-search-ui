// Logos
import logo from '../assets/logo192.png';
import userLogo from '../assets/user-logo.png';

// Pages
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import WorkPage from '../Pages/WorkPage';
import axios from "axios";

// Vars
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, } from "react-bootstrap";
import { Switch, Route, Link } from 'react-router-dom';
import { config } from '../Config.js';
import { keycloak } from "../index";
import { Button, Modal, Form } from "antd";
import AddSearch from './ForWorkpage/AddSearch';
import StatusTable from './StatusTable';
import Text from 'antd/lib/typography/Text';

function HeaderFunc(props) {

    const [modalActive, setModalActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reqStatuses, setReqStatuses] = useState([]);
    const [sources, setSources] = useState([]);
    const [form] = Form.useForm();
    const [report, setReport] = useState({});
    const [loading, setloading] = useState(false);


    const MINUTE_MS = 10000;


    const getReport = async (id, time) => {
        setloading(true);
        await axios.post(`${config.url}/api/report/get`, {
            requestId: id,
            time: time
        }).then(res => {
            console.log('req data: ' + res.data);
            if (JSON.stringify(res.data) === 'null') {
                getReport(id, 'second');
            } else {
                setReport(res.data);
                setloading(false);
            }
        });
    }

    useEffect(() => {

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

        axios.post(`${config.url}/api/status/get`, {
            userId: keycloak.tokenParsed.preferred_username
        }).then((res) => {
            console.log('getRequestStatuses(): ' + JSON.parse(JSON.stringify(res.data)));
            let st = JSON.parse(JSON.stringify(res.data));
            setReqStatuses(st.reverse());
        });
    }


    const changeState = () => {
        if (modalActive) {
            setModalActive(false);
        } else {
            setModalActive(true);
        }
    }

    return (
        <div>
            <Navbar expand="md" bg="dark" variant="dark">
                <Container>

                    <Navbar.Brand>
                        <Link to='/'>

                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            /><Text style={{ color: 'white' }}>Data Collector</Text>
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
                        Search
                    </Button>

                    <Button ghost onClick={changeState} >
                        History
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
                    >
                        Log Out
                    </Button>

                </Container>
            </Navbar>


            <Switch>
                <Route exact path="/" render={(props) =>
                    <Home
                        {...props}
                        allSources={sources}
                    />
                } />

                <Route exact path="/profile" render={(props) =>
                    <Profile
                        {...props}
                        statuses={reqStatuses}
                        sources={sources}
                        getReport={getReport}
                    />
                } />

                <Route path="/workpage" render={(props) =>
                    <WorkPage
                        {...props}
                        statuses={reqStatuses}
                        report={report}
                        loading={loading}
                        sources={sources}
                    />
                } />

            </Switch>



            <AddSearch
                form={form}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                allSources={sources}
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
                    getReport={getReport}
                />
            </Modal>
        </div>
    );
}

export default HeaderFunc;