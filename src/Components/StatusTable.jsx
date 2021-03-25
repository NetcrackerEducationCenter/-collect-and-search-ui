import React from 'react'
import { Container, Table } from 'react-bootstrap';

function StatusTable(props) {

    const statusList = ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED'];

    const getContent = (v) => {
        return (
            <>
                <td>{v.requestId}</td>
                <td>{v.keywords.map(e=>{return ' ' + e})}</td>
                <td>{v.date}</td>
                <td>{v.status}</td>
            </>
        )
    }

    return (
        <Container>

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
                    {props.statuses.map(v => {
                        if (v.message.status === statusList[2]) {

                            if (props.requestId === v.message.requestId) {
                                return (
                                    <tr className='active' style={{ border: 4, borderColor: 'blue' }} key={v.message.requestId}
                                        onClick={() => { props.setRequestId(v.message.requestId) }} >
                                        {getContent(v.message)}
                                    </tr>
                                );
                            }

                            else {
                                return (
                                    <tr style={{ backgroundColor: 'RGB(191, 253, 252)' }} key={v.message.requestId}
                                        onClick={() => { props.setRequestId(v.message.requestId) }} >
                                        {getContent(v.message)}
                                    </tr>
                                );
                            }

                        } else {
                            return (
                                <tr className='table-borderless' key={v.message.requestId} >
                                    {getContent(v.message)}
                                </tr>
                            );
                        }
                    })}
                </tbody>

            </Table>
        </Container>
    );
}

export default StatusTable;
