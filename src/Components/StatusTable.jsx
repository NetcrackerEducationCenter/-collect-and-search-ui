import React, { useState } from 'react'
import { Container, Nav, Pagination, Row, Tab, Table } from 'react-bootstrap';

function StatusTable(props) {

    const statusList = ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED'];

    const [active, setactive] = useState(0);

    const getContent = (i, v) => {
        return (
            <>
                <td>{i + 1}</td>
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
                                        <tr style={{ border: 4, borderColor: 'blue', backgroundColor: 'RGB(0, 136, 255)' }} key={v.message.requestId}
                                            onClick={async () => { props.setRequestId(v.message.requestId, 'first') }} >
                                            {getContent(i++, v.message)}
                                        </tr>
                                    );
                                }

                                else {
                                    return (
                                        <tr style={{ backgroundColor: 'RGB(187, 223, 255)' }} key={v.message.requestId}
                                            onClick={async () => { props.setRequestId(v.message.requestId, 'first') }} >
                                            {getContent(i++, v.message)}
                                        </tr>
                                    );
                                }

                            } else {
                                return (
                                    <tr className='table-borderless' key={v.message.requestId} >
                                        {getContent(i++, v.message)}
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
    let items = [];
    let tabItem = [];
    for (let i = 0; i < tabCount; i++) {
        tabItem.push(i);
    }
    for (let i = 1; i <= tabCount; i++) {
        items.push(
            <Nav.Item key={i}>
                <Nav.Link eventKey={i} onClick={()=>setactive(i)}>
                    <Pagination.Item
                        key={i}
                        active={i === active}
                    >
                        {i}
                    </Pagination.Item>
                </Nav.Link>
            </Nav.Item>
        );
    }
    return (
        <Container >
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >

                <Row className='justify-content-center'>

                    <Tab.Content>
                        {tabItem.map((item, index) => {
                            return (
                                <Tab.Pane key={index} eventKey={item+1}>
                                    {createTable(item * 5, item * 5 + 5)}
                                </Tab.Pane>
                            );
                        })}
                    </Tab.Content>

                </Row>
                
                <Row className='justify-content-center'>
                    <Nav variant="tabs" className="flex-column">
                        <Pagination>
                            {items}
                        </Pagination>
                    </Nav>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default StatusTable;
