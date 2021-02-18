import React, { Component } from 'react';
import Avatar from '../Components/ForProfile/Avatar';
import UserInfo from '../Components/ForProfile/UserInfo';
import Sources from '../Components/ForProfile/Sources';
import Users from '../Components/ForProfile/Users';

import { Col, Container, Row } from 'react-bootstrap';

export default class Profile extends Component {
    render() {
        return (
            <Container fluid className='mt-sm-2 mt-lg-5'>
                <Row className='mt-sm-5'></Row>
                <Row className='mt-sm-5 mt-lg-5'>
                    <Col ms={6} lg={4} className="bg-success">
                        <Avatar />
                    </Col>
                    <Col ms={6} lg={4} className="bg-primary">
                        <UserInfo />
                    </Col>
                    <Col lg={4} className="bg-danger">
                        <Sources />
                    </Col>
                </Row>
                <Row>
                    <Col className="bg-info">
                        <Users />
                    </Col>
                </Row>
            </Container>
        )
    }
}
