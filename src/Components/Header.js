import React, { Component } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import logo from './logo192.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatusButton from '../Components/StatusButton'

import Home from '../Pages/Home';
import About from '../Pages/About';
import History from '../Pages/History';
import Profile from '../Pages/Profile';
import WorkPage from '../Pages/WorkPage'


export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
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
                        <Button variant="outline-info"><StatusButton isEmpty={true} /></Button>
                    </Container>
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
            </>
        );
    }
}
