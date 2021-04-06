import React, { useState } from 'react'
import { Col, Container, Nav, Row, Tab, Table } from 'react-bootstrap';

function StatusTable(props) {

    const statusList = ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED'];

    const getContent = (i, v) => {
        return (
            <>
                <td>{i+1}</td>
                <td>{v.keywords.map(e => { return ' ' + e })}</td>
                <td>{v.date}</td>
                <td>{v.status}</td>
            </>
        )
    }

    const createTable = (i, n) => {
        return (

            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Request</th>
                        <th>Date added</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.statuses.slice(i, n).map(v => {
                            if (v.message.status === statusList[2]) {

                                if (props.requestId === v.message.requestId) {
                                    return (
                                        <tr style={{ border: 4, borderColor: 'blue', backgroundColor: 'RGB(122, 255, 255)' }} key={v.message.requestId}
                                            onClick={async () => { props.setRequestId(v.message.requestId, 'first') }} >
                                            {getContent(i++,v.message)}
                                        </tr>
                                    );
                                }

                                else {
                                    return (
                                        <tr style={{ backgroundColor: 'RGB(191, 253, 252)' }} key={v.message.requestId}
                                            onClick={async () => { props.setRequestId(v.message.requestId, 'first') }} >
                                            {getContent(i++,v.message)}
                                        </tr>
                                    );
                                }

                            } else {
                                return (
                                    <tr className='table-borderless' key={v.message.requestId} >
                                        {getContent(i++,v.message)}
                                    </tr>
                                );
                            }
                        })
                    }
                </tbody>

            </Table>
        );
    }

    let tabCount = parseInt(props.statuses.length / 5) + 1;
    let tabArray = [];
    for (let i = 0; i < tabCount; i++) {
        tabArray.push(i);
    }
    return (
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {tabArray.map((item, index) => {
                                return (
                                    <Nav.Item>
                                        <Nav.Link eventKey={item}>{item+1}</Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {tabArray.map((item, index) => {
                                return (
                                    <Tab.Pane eventKey={item}>
                                        {createTable(item * 5, item * 5 + 5)}
                                    </Tab.Pane>
                                );
                            })}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default StatusTable;
