import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatusButton from '../Components/StatusButton';
import ModalRequests from './ModalRequests';
import { config } from '../Config.js';

//Logos
import logo from '../assets/logo192.png';
import userLogo from '../assets/user-logo.png';

//Pages
import Home from '../Pages/Home';
import About from '../Pages/About';
import History from '../Pages/History';
import Profile from '../Pages/Profile';
import WorkPage from '../Pages/WorkPage';
import axios from "axios";
import { keycloak } from "../index";

// export let sources;

function HeaderFunc(props) {

    const [modalActive, setModalActive] = useState(false);
    const [reqStatuses, setReqStatuses] = useState([]);
    const [sources, setSources] = useState([]);
    const [modalEmpty, setModalEmpty] = useState(true);
    const [report, setReport] = useState('');
    const [reqId, setReqId] = useState('');



    const MINUTE_MS = 10000;

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

    /**
     * Get report from kafka
     * @param {*} id report Id
     */
    const getReport = (id, time) => {
        axios.post(`${config.url}/api/report/get`, {
            requestId: id,
            time: time
        }).then(res => {
            if (!res.data) {
                getReport(id, 'second');
            } else {
                setReqId(res.data.requestId);
                setReport(res.data);
            }
        });
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

                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />Collect and Search
                    </Navbar.Brand>

                    <Nav className="mr-auto">
                        <Nav.Link href='/workpage'>Workpage</Nav.Link>
                    </Nav>

                    <Button variant="outline-info" onClick={changeState} >
                        <StatusButton isEmpty={modalEmpty} />
                    </Button>

                    <Button variant="outline-info" href="/profile" className='bg-transparent border-0' >
                        <img
                            src={userLogo}
                            alt="user"
                            height="30"
                            width="30"
                        />
                    </Button>

                    <Button className='bg-transparent border-3' variant="outline-info"
                        onClick={() => keycloak.logout()}
                    >
                        Log Out
                    </Button>


                </Container>

            </Navbar>


            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/history" component={History} />
                    <Route exact path="/about" component={About} />
                    {/* <Route exact path="/profile" component={Profile} /> */}
                    <Route exact path="/profile" render={(props) =>
                        <Profile
                            sources={sources}
                        />
                    }

                    />
                    <Route exact path="/workpage" render={(props) =>
                        <WorkPage
                            {...props}
                            report={report}
                            statuses={reqStatuses}
                            requestId={reqId}
                            setRequestId={getReport}
                            sources={sources}
                        />
                    }
                    />
                </Switch>
            </Router>

            <Container >
                <ModalRequests
                    show={modalActive}
                    setActive={setActive}
                    statuses={reqStatuses}
                    requestId={report.requestId}
                    setRequestId={getReport}
                    onHide={() => setModalActive(false)}
                />
            </Container>
        </div>
    );
}

export default HeaderFunc;