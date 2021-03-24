import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatusButton from '../Components/StatusButton';
import ModalRequests from './ModalRequests';

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

function HeaderFunc(props) {

    const [modalActive, setModalActive] = useState(false);
    const [reqStatuses, setReqStatuses] = useState([]);
    const [modalEmpty, setModalEmpty] = useState(true);
    const [report, setReport] = useState('');

    const MINUTE_MS = 10000;

    useEffect(() => {
        getRequestStatuses();
        const interval = setInterval(() => {
            getRequestStatuses();
        }, MINUTE_MS);
        return () => {
            clearInterval(interval);
        }
    }, []);

    /**
     * Find report from mongo
     * @param {*} id report Id
     */
    const getReport = (id) => {
        console.log(id);
        axios.post('http://206.81.22.187:7071/api/report/get', {

            requestId: id

        }).then(res => {
            setReport(JSON.parse(JSON.stringify(res.data)));
        });
    }

    const getRequestStatuses = async () => {
        axios.post('http://206.81.22.187:7071/api/status/get').then((res) => {
            console.log('getRequestStatuses(): ' + JSON.parse(JSON.stringify(res.data)));
            setReqStatuses(JSON.parse(JSON.stringify(res.data)));
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
                        <Nav.Link href='/workpage/'>Workpage</Nav.Link>
                    </Nav>
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href='/workpage'>Workpage</Nav.Link>
                        </Nav>
                
                    </Navbar.Collapse>  */}
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

                </Container>

            </Navbar>


            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/history" component={History} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/about" component={About} />
                    {/* <Route exact path="/workpage" component={WorkPage} /> */}
                    <Route path="/workpage" render={(props) =>
                            <WorkPage
                                {...props}
                                report={report}
                                statuses={reqStatuses}
                                requestId={report.requestId}
                                setRequestId={getReport}
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