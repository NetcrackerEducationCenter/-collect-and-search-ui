import React, { Component } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import logo from './logo192.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatusButton from '../Components/StatusButton';
import ModalRequests from './ModalRequests';

import Home from '../Pages/Home';
import About from '../Pages/About';
import History from '../Pages/History';
import Profile from '../Pages/Profile';
import WorkPage from '../Pages/WorkPage';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false
        }
    }

    changeState = () => {
        if (this.state.modalActive) {
            this.setState(() => { return { modalActive: false } });
        } else {
            this.setState(() => { return { modalActive: true } });
        }
    }

    setActive = (activeted) => {
        this.setState(() => { return { modalActive: activeted } })
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <Navbar fixed="top" expand="md" bg="dark" variant="dark">
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
                        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href='/workpage'>Workpage</Nav.Link>
                            </Nav>
                    
                        </Navbar.Collapse>  */}
                        <Button variant="outline-info" onClick={() => this.changeState()} ><StatusButton isEmpty={true} /></Button>
                    </Container>

                    <Button variant="outline-info" href="/profile" ><img
                        src="https://pngshare.com/wp-content/uploads/2020/06/font-awesome_4-7-0_user_1024_0_00aeef_none-3.png"
                        alt="user"
                        height="30"
                        width="30"
                    />
                    </Button>
                </Navbar>


                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/history" component={History} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/workpage" component={WorkPage} />
                    </Switch>
                </Router>

                <Container >
                    <ModalRequests active={this.state.modalActive}
                        setActive={this.setActive}
                    />
                </Container>
            </div>
        );
    }
}
